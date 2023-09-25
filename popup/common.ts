

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

