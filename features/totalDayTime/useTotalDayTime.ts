import { useContext } from "react";
import * as context from "~components/Provider/MyProvider";
import useDaytaskOrder from "~hooks/useDayTaskOrder";


/**
 * タスク時間の合計を返す関数
 * @returns 
 */
const useDayTotalTime = (dayIndex: number) => {
  const [allTask] = useContext(context.allTaskContext)
  const dayTaskOrder = useDaytaskOrder(dayIndex)
  // タスク時間の配列を作る
  const dayTimeAry: number[] = dayTaskOrder.map(taskId => {
    const task = allTask[taskId]
    return task ? task.time : 0
  })
  // 配列の時間を全て合計する
  const totalTime: number = dayTimeAry.reduce((sum, time) => sum + time, 0)

  return totalTime
}

export default useDayTotalTime