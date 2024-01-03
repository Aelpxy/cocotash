package middlewares

import (
	"net/http"
	"os"

	"github.com/aelpxy/ventus/handlers"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, handlers.ErrorResponse{
			ErrorType:  "Unauthorized",
			Message:    "Authorization header is missing",
			StatusCode: http.StatusUnauthorized,
		})
		c.Abort()
		return
	}

	validToken := os.Getenv("DAEMON_API_TOKEN")
	if validToken == "" {
		c.JSON(http.StatusInternalServerError, handlers.ErrorResponse{
			ErrorType:  "Internal Server Error",
			Message:    "Valid token not found in environment variables",
			StatusCode: http.StatusInternalServerError,
		})
		c.Abort()
		return
	}

	if authHeader != "Bearer "+validToken {
		c.JSON(http.StatusUnauthorized, handlers.ErrorResponse{
			ErrorType:  "Unauthorized",
			Message:    "Invalid token provided",
			StatusCode: http.StatusUnauthorized,
		})
		c.Abort()
		return
	}

	c.Next()
}
