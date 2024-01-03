package handlers

import (
	"context"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

func GetContainerLogs(c *gin.Context) {
	containerID := c.Param("id")

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

	logOptions := types.ContainerLogsOptions{
		ShowStdout: true,
		ShowStderr: true,
		Follow:     true,
	}

	logs, err := cli.ContainerLogs(ctx, containerID, logOptions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    fmt.Sprintf("Failed to fetch logs for container %s", containerID),
			StatusCode: http.StatusInternalServerError,
		})
		return
	}

	c.Status(http.StatusOK)
	c.Header("Content-Type", "text/plain")
	io.Copy(c.Writer, logs)
}