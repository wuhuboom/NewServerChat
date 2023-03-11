package controller

import (
	"NewServerSystem/common"
	"NewServerSystem/tools"
	"github.com/gin-gonic/gin"
)

var StopSign = make(chan int)

func SystemStop(c *gin.Context) {
	StopSign <- 1
	tools.WriteJson(c, common.ReturnCode, common.MSgOK, nil)
	return
}
