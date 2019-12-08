package main

import (
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/zsais/go-gin-prometheus"
	"net/http"
)

func main() {
	router := gin.Default()
	router.Use(gin.Logger())

	router.Use(static.Serve("/", static.LocalFile("./build", true)))

	router.GET("/VERSION", func(c *gin.Context) {
		c.HTML(http.StatusOK, "VERSION", nil)
	})
	router.GET("/LICENSE", func(c *gin.Context) {
		c.HTML(http.StatusOK, "LICENSE", nil)
	})
	// metrics
	p := ginprometheus.NewPrometheus("gin")
	p.Use(router)
	// Start and run the server
	router.Run(":5000")
}
