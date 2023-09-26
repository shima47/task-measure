import { useContext } from "react"
import * as context from "~components/Provider/MyProvider"
import useDaytaskOrder from "~hooks/useDayTaskOrder"
import useUpdateTask from "~hooks/useUpdateTask"


const useFixTaskTime = (dayIndex: number) => {
  const dayTaskOrder = useDaytaskOrder(dayIndex)
  const [allTask,] = useContext(context.allTaskContext)
  const { updateTaskTime } = useUpdateTask()

  const onClickFixTaskTime = (event) => {
    // 親コンポーネントへのイベントの伝搬を防ぐ
    event.stopPropagation()

    if (!confirm("時間を確定して値を丸めます")) return
    dayTaskOrder.map(taskId => {
      const newTaskTime = roundToNearestQuarter(allTask[taskId]["time"])
      console.log(newTaskTime)
      updateTaskTime(taskId, newTaskTime)
    })
  }

  // 入力値を丸める関数 by ChatGPT3.5
  const roundToNearestQuarter = (inputNumber: number) => {
    // 入力値を0.25で割り、小数点以下の部分を取得します
    const TIME_UNIT = 0.25
    const remainder = inputNumber % TIME_UNIT
    // 余りが0.125未満の場合は切り捨て
    if (remainder < 0.125) {
      return inputNumber - remainder
    } else {
      return inputNumber - remainder + 0.25
    }
  }

  return { onClickFixTaskTime }
}

export default useFixTaskTime