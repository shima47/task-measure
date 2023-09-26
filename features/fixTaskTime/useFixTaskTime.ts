import { useContext } from "react"
import * as context from "~components/Provider/MyProvider"
import useDaytaskOrder from "~hooks/useDayTaskOrder"


const useFixTaskTime = (dayIndex: number) => {
  const dayTaskOrder = useDaytaskOrder(dayIndex)
  const [allTask, setAllTask] = useContext(context.allTaskContext)

  const onClickFixTaskTime = (event) => {
    // 親コンポーネントへのイベントの伝搬を防ぐ
    event.stopPropagation()

    if (!confirm("時間を整理します")) return
    let newTaskObj = {}
    dayTaskOrder.forEach((taskId) => {
      const task = allTask[taskId]
      const newTaskTime = roundToNearestQuarter(task.time)
      newTaskObj[taskId] = { ...task, time: newTaskTime }
    })
    setAllTask(current => ({ ...current, ...newTaskObj }))
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