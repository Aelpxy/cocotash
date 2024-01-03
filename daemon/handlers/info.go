package handlers

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"runtime"

	"github.com/docker/docker/api/types"
	dockerClient "github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
)

type SystemInfo struct {
	Name 			string `json:name`
	ContainersCount int    `json:"container_count"`
	Processor       string `json:"processor"`
}

func GetInfo(c *gin.Context) {
	dockerInfo, err := getDockerInfo()

	if err != nil {
		c.JSON(http.StatusInternalServerError, ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    fmt.Sprintf("Failed to get Docker info: %s", err.Error()),
			StatusCode: http.StatusInternalServerError,
		})
		return
	}

	sysInfo := SystemInfo{
		Name:             fmt.Sprintf("ventus.daemon"),
		ContainersCount: dockerInfo.Containers,
		Processor:       getProcessorInfo(),
	}

	c.JSON(http.StatusOK, sysInfo)
}

func getDockerInfo() (*types.Info, error) {
	cli, err := dockerClient.NewClientWithOpts(dockerClient.FromEnv, dockerClient.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}

	ctx := context.Background()
	dockerInfo, err := cli.Info(ctx)
	if err != nil {
		return nil, err
	}

	return &dockerInfo, nil
}

func getProcessorInfo() string {
	return runtime.GOARCH
}
