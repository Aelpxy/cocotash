package handlers

import (
	"context"
	"fmt"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

func DeleteContainer(c *gin.Context) {
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

	err = cli.ContainerRemove(ctx, containerID, types.ContainerRemoveOptions{Force: true})
	if err != nil {
		if err.Error() == fmt.Sprintf("No such container: %s", containerID) {
			c.JSON(http.StatusNotFound, ErrorResponse{
				ErrorType:  "Not Found",
				Message:    fmt.Sprintf("Container %s not found", containerID),
				StatusCode: http.StatusNotFound,
			})
		} else {
			c.JSON(http.StatusInternalServerError, ErrorResponse{
				ErrorType:  "Internal Server Error",
				Message:    fmt.Sprintf("Failed to delete container %s: %s", containerID, err.Error()),
				StatusCode: http.StatusInternalServerError,
			})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("Container %s deleted successfully", containerID),
	})
}
