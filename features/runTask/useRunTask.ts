import { useState, useEffect, useContext } from "react";
import useUpdateTask from "~hooks/useUpdateTask";
import { INITIAL_DATA } from "~components/initialData";
import * as context from "~components/Provider/MyProvider";


const useRunTask = (taskIdToRun: string = "") => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [runningTask, setRunningTask] = useContext(context.runningTaskInfoContext)
  const { updateTaskTime } = useUpdateTask()

  const onClickStart = () => {
    // このフックに引数が渡されなければ実行しない
    if (taskIdToRun === "") return
    // 前に実行中だったタスクに時間を記録する
    if (runningTask.id) {
      const task = allTask[runningTask.id]
      const newTaskTime = ((parseFloat(task.time) * 3600000) + (Date.now() - runningTask.startTime)) / 3600000
      updateTaskTime(runningTask.id, newTaskTime)
    }

    setRunningTask({ id: taskIdToRun, startTime: Date.now(), })
  }

  const onClickStop = () => {
    if (runningTask.id === "") return
    // 実行中だったタスクに時間を記録する
    const didTask = allTask[runningTask.id]
    const newTaskTime = ((parseFloat(didTask.time) * 3600000) + (Date.now() - runningTask.startTime)) / 3600000
    updateTaskTime(runningTask.id, newTaskTime)

    setRunningTask(INITIAL_DATA.RUNNING_TASK)
  }

  return { onClickStart, onClickStop, } as const
}

export default useRunTask