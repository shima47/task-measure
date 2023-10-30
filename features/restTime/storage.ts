import { getBucket } from "@extend-chrome/storage";
import * as type from "~types/type"
import { INITIAL_DATA } from "~components/initialData";

const bucket = getBucket<type.myBucket>('myBucket');

export const getRestTime = async () => {
  // ローカルストレージから取得
  const res = await bucket.get({ restTime: INITIAL_DATA.REST_TIME })
  return res.restTime
}

export const updateRestTime = async (restTimeIndex: number, key: type.restTimeKeys, value: type.restTimeValues) => {
  // ローカルストレージから取得
  const restTimeAry = await getRestTime()
  // データを更新
  const newRestTime: type.restTime = { ...restTimeAry[restTimeIndex], [key]: value }
  restTimeAry[restTimeIndex] = newRestTime
  await bucket.set({ restTime: restTimeAry })
}

