package main

import (
	"fmt"
	"github.com/gin-gonic/contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/zsais/go-gin-prometheus"
	"log"
	"net/http"
	"os"
)

func main() {
	router := gin.Default()
	router.Use(gin.Logger())

	router.Use(static.Serve("/", static.LocalFile("./build", true)))

	router.LoadHTMLGlob("./static-files/**")
	router.Static("/static", "static")
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
	if os.Getenv("PORT") == "" {
		log.Fatalf("cannot serve: no PORT set")
	}
	router.Run(fmt.Sprintf(":%s", os.Getenv("PORT")))
}
