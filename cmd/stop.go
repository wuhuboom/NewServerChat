package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"io/ioutil"
	"os/exec"
	"runtime"
	"strings"
)

var stopCmd = &cobra.Command{
	Use:   "stop",
	Short: "停止客服http服务",
	Run: func(cmd *cobra.Command, args []string) {
		KillProcess()
	},
}

func KillProcess() error {
	pid, err := ioutil.ReadFile("ServerSystem.sock")
	if err != nil {
		fmt.Println(err.Error())
		return err
	}
	pidSlice := strings.Split(string(pid), ",")
	var command *exec.Cmd
	for _, pid := range pidSlice {
		if runtime.GOOS == "windows" {
			command = exec.Command("taskkill.exe", "/f", "/pid", pid)
		} else {
			command = exec.Command("kill", pid)
		}
		err := command.Start()
		if err != nil {
			fmt.Println(err.Error())
			return err
		}
	}
	return nil
}
