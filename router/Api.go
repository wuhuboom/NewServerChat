package router

import (
	"NewServerSystem/controller"
	"github.com/gin-gonic/gin"
)

func InitApiRouter(engine *gin.Engine) {
	systemGroup := engine.Group("/system")
	{
		//关闭系统
		systemGroup.GET("/stop", controller.SystemStop)
	}

}
