package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"strconv"

	"github.com/aelpxy/ventus/utils"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
	"github.com/gin-gonic/gin"
)

func CreateRedisDatabaseContainer(c *gin.Context) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    "Failed to create Docker client",
			StatusCode: http.StatusInternalServerError,
		})
		return
	}

	ctx := context.Background()

	randomID := utils.GenerateRandomID(16)
	password := utils.GenerateRandomPassword(32)
	port := utils.GenerateRandomPort()

	memoryLimitBytes := int64(128 * 1024 * 1024)
	cpuPeriodMicros := int64(100000)
	cpuQuotaMicros := int64(50000)
	cpuShares := int64(1024)

	hostConfig := &container.HostConfig{
		PortBindings: nat.PortMap{
			"6379/tcp": []nat.PortBinding{{HostIP: "0.0.0.0", HostPort: strconv.Itoa(port)}},
		},
		RestartPolicy: container.RestartPolicy{
			Name:              "always",
			MaximumRetryCount: 10,
		},
		Resources: container.Resources{
			Memory:     memoryLimitBytes,
			MemorySwap: memoryLimitBytes,
			CPUPeriod:  cpuPeriodMicros,
			CPUQuota:   cpuQuotaMicros,
			CPUShares:  cpuShares,
		},
		Binds: []string{fmt.Sprintf("%s:/data", randomID+".volume.ventus")},
	}

	config := &container.Config{
		Image: "redis:alpine",
		Cmd:   []string{"redis-server", "--requirepass", password},
	}

	publicHost := os.Getenv("PUBLIC_HOST_URL")

	resp, err := cli.ContainerCreate(ctx, config, hostConfig, nil, nil, fmt.Sprintf("%s.%s", randomID, "ventus.internal"))
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    fmt.Sprintf("Failed to create container: %s", err.Error()),
			StatusCode: http.StatusInternalServerError,
		})
		return
	}

	err = cli.ContainerStart(ctx, resp.ID, types.ContainerStartOptions{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    fmt.Sprintf("Failed to start container: %s", err.Error()),
			StatusCode: http.StatusInternalServerError,
		})
		return
	}

	databaseURL := fmt.Sprintf("redis://default:%s@%s:%d", password, publicHost, port)

	response := gin.H{
		"id":     randomID,
		"type":   "redis",
		"url":    databaseURL,
	}

	c.JSON(http.StatusCreated, response)
}
