package main

func main() {
	// may change in the future
	requiredEnvVars := []string{"COCOTASH_SERVER_TOKEN"}

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

	r.GET("/health", func(ctx *gin.Context) {
		response := gin.H{
			"status":        "ok",
		}

		ctx.JSON(http.StatusOK, response)
	})

	r.GET("/ping", func(ctx *gin.Context) {
		response := gin.H{
			"message":        "pong",
		}

		ctx.JSON(http.StatusOK, response)
	})
}