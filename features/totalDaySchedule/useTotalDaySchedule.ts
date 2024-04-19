import { useContext } from "react";
import * as context from "~components/Provider/MyProvider";
import useDaytaskOrder from "~hooks/useDayTaskOrder";


/**
 * タスク時間の合計を返す関数
 * @returns 
 */
const useDayTotalSchedule = (dayIndex: number) => {
  const [allTask] = useContext(context.allTaskContext)
  const dayTaskOrder = useDaytaskOrder(dayIndex)
  // タスク時間の配列を作る
  const dayScheduleAry: number[] = dayTaskOrder.map(taskId => {
    const task = allTask[taskId]
    return task ? task.schedule : 0
  })
  // 配列の時間を全て合計する
  const totalSchedule: number = dayScheduleAry.reduce((sum, time) => sum + time, 0)

  return totalSchedule
}

export default useDayTotalSchedule