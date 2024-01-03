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

func CreatePostgreSQLDatabaseContainer(c *gin.Context) {
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

	memoryLimitBytes := int64(256 * 1024 * 1024)
	cpuPeriodMicros := int64(100000)
	cpuQuotaMicros := int64(50000)
	cpuShares := int64(1024)

	hostConfig := &container.HostConfig{
		PortBindings: nat.PortMap{
			"5432/tcp": []nat.PortBinding{{HostIP: "0.0.0.0", HostPort: strconv.Itoa(port)}},
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
		Binds: []string{fmt.Sprintf("%s:/var/lib/postgresql/data", randomID+".volume.ventus")},
	}

	config := &container.Config{
		Image: "postgres:alpine",
		Env:   []string{"POSTGRES_PASSWORD=" + password},
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

	databaseURL := fmt.Sprintf("postgres://postgres:%s@%s:%d/postgres", password, publicHost, port)

	response := gin.H{
		"id":     randomID,
		"type":   "postgresql",
		"url":    databaseURL,
	}

	c.JSON(http.StatusCreated, response)
}
