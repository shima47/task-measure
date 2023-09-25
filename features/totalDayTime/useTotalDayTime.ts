import { useContext } from "react";
import * as context from "~components/Provider/MyProvider";
import useDaytaskOrder from "~hooks/useDayTaskOrder";


/**
 * タスク時間の合計を返す関数
 * @returns 0埋めされた合計
 */
const useDayTotalTime = (dayIndex: number) => {
  const [allTask] = useContext(context.allTaskContext)
  const dayTaskOrder = useDaytaskOrder(dayIndex)
  // タスク時間の配列を作る
  const dayTimeAry: number[] = dayTaskOrder.map(taskId => allTask[taskId]["time"])
  // 配列の時間を全て合計する
  const totalTime: number = dayTimeAry.reduce((sum, time) => sum + time, 0)

  return totalTime
}

export default useDayTotalTime