
/**
 * ミリ秒を00h 00mの形にフォーマットする関数 by ChatGPT3.5
 * @param milliseconds 
 * @returns 
 */
export const millisecondsToHours = (milliseconds: number) => {
  const hours = milliseconds / 3600000; // 1時間のミリ秒数で割る
  const result = parseFloat(hours.toFixed(2)); // 小数点以下2桁までの小数を取得
  return result === 0 ? "0.00" : `${String(result)}`; // 0のとき表示を変える
}

export const getDayTaskOrder = (orderData, index) => {
  // タスクの開始インデックスを見つける
  const taskStartIndex = orderData.indexOf(index) + 1;
  // タスクの終了インデックスを見つける
  const taskEndIndex = orderData.indexOf(index + 1);

  // 開始インデックスが0または終了インデックスが-1の場合、タスクは存在しないため、空の配列を返す
  if (taskStartIndex === 0 || taskEndIndex === -1) { return []; }

  // 開始インデックスと終了インデックスの間の部分配列を取得する
  const dayTaskOrder = orderData.slice(taskStartIndex, taskEndIndex);
  return dayTaskOrder;
}

/**
 * タスク時間の合計を返す関数
 * @param dayTaskOrder その曜日のタスクIDの並び順
 * @param allTaskState 全てのタスクデータ
 * @returns 0埋めされた合計
 */
export const getTotalDayTime = (dayTaskOrder: string[], allTaskState) => {
  const [allTask, setAllTask] = allTaskState
  const dayTimeAry: number[] = dayTaskOrder.map(taskId => allTask[taskId]["time"])
  // 配列の時間を全て合計する
  const totalTime: number = dayTimeAry.reduce((sum, time) => sum + time, 0)
  return totalTime
};

