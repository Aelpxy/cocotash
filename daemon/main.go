package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/aelpxy/ventus/handlers"
	"github.com/aelpxy/ventus/middlewares"
	"github.com/gin-gonic/gin"
)

func main() {
	requiredEnvVars := []string{"DAEMON_API_TOKEN", "PUBLIC_HOST_URL"}
	for _, envVar := range requiredEnvVars {
		if value := os.Getenv(envVar); value == "" {
			fmt.Printf("Error: Required environment variable %s is not set.\n", envVar)
			os.Exit(1)
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "5000"
	}

	r := gin.Default()

	r.GET("/", func(ctx *gin.Context) {
		response := gin.H{
			"name":        "Ventus Daemon",
		}

		ctx.JSON(http.StatusOK, response)
	})

	authGroup := r.Group("/")
	authGroup.Use(middlewares.AuthMiddleware)

	authGroup.GET("/info", handlers.GetInfo)

	authGroup.GET("/db/:id", handlers.GetContainerInfo)
	authGroup.GET("/db/metrics/:id", handlers.ContainerMetrics)
	authGroup.GET("/db/:id/live", handlers.GetContainerLogs)
	authGroup.POST("/db/redis", handlers.CreateRedisDatabaseContainer)
	authGroup.POST("/db/postgres", handlers.CreatePostgreSQLDatabaseContainer)
	authGroup.DELETE("/db/:id", handlers.DeleteContainer)

	r.Run(":" + port)
}
