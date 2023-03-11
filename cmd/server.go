package cmd

import (
	"NewServerSystem/common"
	"NewServerSystem/controller"
	"NewServerSystem/middleware"
	"NewServerSystem/router"
	"NewServerSystem/setting"
	"NewServerSystem/tools"
	"context"
	"fmt"
	"github.com/gin-contrib/pprof"
	"github.com/gin-gonic/gin"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
	"github.com/zh-five/xdaemon"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

var (
	port     string
	daemon   bool
	rootPath string
)
var serverCmd = &cobra.Command{
	Use:     "server",
	Short:   "启动客服http服务",
	Example: "go-fly server",
	Run:     run,
}

func init() {
	serverCmd.PersistentFlags().StringVarP(&rootPath, "rootPath", "r", "", "程序根目录")
	serverCmd.PersistentFlags().StringVarP(&port, "port", "p", "8081", "监听端口号")
	serverCmd.PersistentFlags().BoolVarP(&daemon, "daemon", "d", false, "是否为守护进程模式")
}

func run(cmd *cobra.Command, args []string) {
	baseServer := "0.0.0.0:" + port
	//守护进程
	initDaemon()
	//加载配置
	if err := setting.Init(); err != nil {
		fmt.Println("配置文件初始化事变", err)
		return
	}
	//设置时区
	loc, err := time.LoadLocation(viper.GetString("app.timeZone"))
	if err == nil {
		time.Local = loc // -> this is setting the global timezone
		fmt.Println(time.Now().Format("2006-01-02 15:04:05 "))
	}

	gin.SetMode(gin.ReleaseMode)
	engine := gin.Default()
	engine.Static("/static", common.StaticDirPath)
	srv := &http.Server{
		Addr:    baseServer,
		Handler: engine,
	}
	engine.Use(middleware.CrossSite)
	engine.Use(tools.Session("NewServerSystem"))
	router.InitApiRouter(engine)
	//限流类
	tools.NewLimitQueue()
	//性能监控
	pprof.Register(engine)
	go func() {
		if err := srv.ListenAndServe(); err != nil {
			log.Printf("NewServerSystem服务监听: %s\n", err)
		}
	}()
	<-controller.StopSign
	log.Println("关闭服务...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatal("服务关闭失败:", err)
	}
	log.Println("服务已关闭")

}

//初始化守护进程
func initDaemon() {
	//启动进程之前要先杀死之前的进程
	err := KillProcess()
	if err != nil {
		fmt.Println(err.Error())
		return
	}
	if daemon == true {
		d := xdaemon.NewDaemon("ServerSystem.log")
		d.MaxError = 10
		d.Run()
	}
	//记录pid
	ioutil.WriteFile("ServerSystem.sock", []byte(fmt.Sprintf("%d,%d", os.Getppid(), os.Getpid())), 0666)
}
