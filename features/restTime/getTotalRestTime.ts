import { getBucket } from "@extend-chrome/storage";
import * as type from "~types/type"
import * as restTimeType from "~features/restTime/type"


const bucket = getBucket<type.myBucket>('myBucket');

// 未反映の経過時間から差し引くための休憩時間を返す
export const getTotalRestTime = async (taskStartTime: number, now: number) => {
  // 休憩時間の設定を取得
  const res = await bucket.get(["restTime"])

  // 選択されたものだけ取り出す
  const restTimeAry = res.restTime.filter(item => item.isSelect)

  // 休憩時間がなければReturn
  if (restTimeAry.length === 0) return 0

  // 休憩時間の変換（String to UNIX time）
  const convertedRestTimeAry: restTimeType.convertedRestTime[] = restTimeAry.map(restTime => {
    return {
      start: convertRestTime(restTime.start),
      end: convertRestTime(restTime.end),
    }
  })

  // 重複する休憩時間をマージする
  const mergedRestTimeAry = mergeRestTime(convertedRestTimeAry)

  // 休憩時間の合計を計算する
  let totalRestTime = 0
  mergedRestTimeAry.forEach(item =>
    totalRestTime += getRestTimeOverlap(item, taskStartTime, now)
  )

  return totalRestTime
}

// 休憩時間（文字列）をUNIX時間に変換する
export const convertRestTime = (restTime: string) => {
  // 休憩時間の時と分を取り出す
  const parts = restTime.split(":")
  const hour = parts[0] || ""
  const min = parts[1] || ""
  // 取り出せなければ終了
  if (hour === "" || min === "") { return 0 }

  // UNIXに変換
  const restDate = new Date()
  restDate.setHours(Number(hour))
  restDate.setMinutes(Number(min))
  return restDate.getTime()
}

// 重複する休憩時間をマージする
export const mergeRestTime = (convertedRestTimeAry: restTimeType.convertedRestTime[]) => {
  // 休憩開始時間の早い順にソート
  const sortedRestTimeAry = [...convertedRestTimeAry]
  sortedRestTimeAry.sort((a, b) => a.start - b.start)

  // 休憩時間の重複をマージ
  const mergedRestTimeAry: restTimeType.convertedRestTime[] = []
  let currentRestTime = sortedRestTimeAry[0]  // sortedRestTimeAryが空ならundefined
  sortedRestTimeAry.forEach(item => {
    const nextRestTime = item
    // 時間が重複している場合、時間範囲をマージ
    // Current |-----|
    // Next       |-----|
    // Merged  |--------|
    if (currentRestTime.end >= nextRestTime.start) {
      currentRestTime.end = nextRestTime.end > currentRestTime.end ? nextRestTime.end : currentRestTime.end
    }
    // 時間が重複していない場合、現在の時間範囲を結果に追加
    // Current |------|       => add to result
    // Next             |---|
    else {
      mergedRestTimeAry.push(currentRestTime)
      currentRestTime = nextRestTime
    }
  })

  if (currentRestTime !== undefined) {
    // 最後の時間範囲を結果に追加
    mergedRestTimeAry.push(currentRestTime)
  }

  return mergedRestTimeAry
}

// 休憩時間と経過時間の重複範囲を計算する
export const getRestTimeOverlap = (restTime: restTimeType.convertedRestTime, taskStartTime: number, now: number) => {
  // Rest |-----|         |-----|
  // Task         |-----|
  if (now <= restTime.start || restTime.end <= taskStartTime) {
    // 休憩時間は加算しない
    return 0
  }
  // Rest |---------|
  // Task  |-----|
  else if (restTime.start <= taskStartTime && now <= restTime.end) {
    return (now - taskStartTime)
  }
  // Rest  |-----|
  // Task |---------|
  else if (taskStartTime <= restTime.start && restTime.end <= now) {
    return (restTime.end - restTime.start)
  }
  // Rest |-----|
  // Task     |------|
  else if (restTime.start <= taskStartTime && restTime.end <= now) {
    return (restTime.end - taskStartTime)
  }
  // Rest     |------|
  // Task |------|
  else if (taskStartTime <= restTime.start && now <= restTime.end) {
    return (now - restTime.start)
  }
}

