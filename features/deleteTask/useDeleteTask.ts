import { useContext, } from "react"
import * as type from "~types/type"
import { INITIAL_DATA } from "~components/initialData"
import * as context from "~components/Provider/MyProvider"


const useDeleteTask = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [order, setOrder] = useContext(context.orderContext)
  const [runningTask, setRunningTask] = useContext(context.runningTaskContext)
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
    if (!confirm("タスクを全て削除しますか？")) return

    setOrder(INITIAL_DATA.ORDER)
    setAllTask(INITIAL_DATA.ALL_TASK)
    setRunningTask(INITIAL_DATA.RUNNING_TASK)
    setSelectedTaskId(INITIAL_DATA.SELECTED_TASK_ID)
  }

  const deleteTask = () => {
    if (!confirm("タスクを削除しますか？")) return

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

  return { onClickDelete, }
}

export default useDeleteTask