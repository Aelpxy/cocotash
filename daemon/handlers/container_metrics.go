package handlers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

func ContainerMetrics(c *gin.Context) {
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

	stats, err := cli.ContainerStats(ctx, containerID, false)
	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    "Failed to get container statistics",
			StatusCode: http.StatusInternalServerError,
		})
		return
	}
	defer stats.Body.Close()

	var statsData types.StatsJSON
	if err := json.NewDecoder(stats.Body).Decode(&statsData); err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    "Failed to read container statistics",
			StatusCode: http.StatusInternalServerError,
		})
		return
	}

	memoryUsedPercentage := 0.0
	if statsData.MemoryStats.Limit > 0 {
		memoryUsedPercentage = float64(statsData.MemoryStats.Usage) / float64(statsData.MemoryStats.Limit) * 100
	}

	ramUsageInMB := statsData.MemoryStats.Usage / (1024 * 1024)
	ramLimitInMB := containerDetails.HostConfig.Memory / (1024 * 1024)

	memoryInfo := map[string]interface{}{
		"used_percentage": memoryUsedPercentage,
		"usage":           ramUsageInMB,
		"limit":           ramLimitInMB,
	}

	response := gin.H{
		"id":         containerDetails.Name,
		"status":     containerDetails.State.Status,
		"created_at": containerDetails.Created,
		"memory":     memoryInfo,
	}

	c.JSON(http.StatusOK, response)
}
