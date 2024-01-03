package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"

	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

func GetContainerInfo(c *gin.Context) {
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

	containerDetails, err := cli.ContainerInspect(ctx, containerID)
	if err != nil {
		c.JSON(http.StatusNotFound, ErrorResponse{
			ErrorType:  "Not Found",
			Message:    fmt.Sprintf("Container %s not found", containerID),
			StatusCode: http.StatusNotFound,
		})
		return
	}

	response := gin.H{
		"id":         containerDetails.Name,
		"status":     containerDetails.State.Status,
		"created_at": containerDetails.Created,
	}

	c.JSON(http.StatusOK, response)
}
