import { useContext, } from "react"
import * as type from "~types/type"
import { INITIAL_DATA } from "~components/initialData"
import * as context from "~components/Provider/MyProvider"


const useDeleteTask = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [order, setOrder] = useContext(context.orderContext)
  const [runningTask, setRunningTask] = useContext(context.runningTaskInfoContext)
  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)

  const onClickDelete = () => {
    // タスクが選択されていなければ全削除
    if (selectedTaskId === "") {
      deleteAllTask()
    } else {
      deleteTask()
    }
  }

  const deleteAllTask = () => {
    if (!confirm("タスクを全て削除しますか？（保護されたタスクは除外）")) return

    // 削除保護されていないタスクIDを削除
    setOrder(prevOrder => prevOrder.filter(item => {
      // 削除保護されているタスクIDと初期データの数字だけ返す
      return checkTaskProtection(item) || INITIAL_DATA.ORDER.includes(item)
    }))

    // 削除保護されていないタスクだけ削除
    setAllTask(prev => {
      const newAllTask = { ...prev }
      // prevAllTaskのKeyを全て取得し、削除保護されていないタスクを削除
      Object.keys(prev).forEach(item => {
        if (checkTaskProtection(item)) {
          // 削除保護されているタスクの時間を0にする
          newAllTask[item].time = 0
          newAllTask[item].schedule = 0
        } else {
          delete newAllTask[item]
        }
      })
      return newAllTask
    })

    setRunningTask(INITIAL_DATA.RUNNING_TASK)
    setSelectedTaskId(INITIAL_DATA.SELECTED_TASK_ID)
  }

  const deleteTask = () => {
    if (!confirm("タスクを削除しますか？（保護されたタスクは除外）")) return

    // 削除するタスクの削除保護をチェック
    if (checkTaskProtection(selectedTaskId)) {
      // 削除するIDのタスク時間を0にする
      setAllTask(prev => {
        const newAllTask = { ...prev };
        newAllTask[selectedTaskId].time = 0;
        newAllTask[selectedTaskId].schedule = 0;
        return newAllTask
      })
      // 終了
      return
    }

    // 削除するID以外を抽出
    setOrder(current => current.filter(item => item !== selectedTaskId))

    // 削除するIDの項目を削除
    setAllTask(current => {
      const newAllTask = { ...current };
      delete newAllTask[selectedTaskId];
      return newAllTask
    })

    setSelectedTaskId(INITIAL_DATA.SELECTED_TASK_ID)

    // 消えたのが実行中のタスクじゃなければ中断
    if (selectedTaskId !== runningTask.id) return

    setRunningTask(INITIAL_DATA.RUNNING_TASK)
  }

  // タスクの削除保護をチェック
  const checkTaskProtection = (taskId: string) => {
    const targetTask = allTask[taskId]
    if (!targetTask) return false

    return targetTask.isProtected
  }

  return { onClickDelete, }
}

export default useDeleteTask