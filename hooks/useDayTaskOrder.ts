import { useContext, } from "react";
import * as context from "~components/Provider/MyProvider";


const useDaytaskOrder = (dayIndex: number) => {
  const [order] = useContext(context.orderContext)

  // タスクの開始インデックスを見つける
  const taskStartIndex = order.indexOf(dayIndex) + 1;
  // タスクの終了インデックスを見つける
  const taskEndIndex = order.indexOf(dayIndex + 1);

  // 開始インデックスが0または終了インデックスが-1の場合、タスクは存在しないため、空の配列を返す
  if (taskStartIndex === 0 || taskEndIndex === -1) { return []; }

  // 開始インデックスと終了インデックスの間の部分配列を取得する
  const dayTaskOrder: string[] = order.slice(taskStartIndex, taskEndIndex);

  return dayTaskOrder
}

export default useDaytaskOrder