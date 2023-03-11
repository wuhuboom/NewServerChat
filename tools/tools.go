package tools

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func WriteJson(c *gin.Context, code int, msg string, result interface{}) {
	c.JSON(http.StatusOK, gin.H{
		"code":   code,
		"msg":    msg,
		"result": result,
	})
}
