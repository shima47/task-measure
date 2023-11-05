import { getBucket } from "@extend-chrome/storage";
import * as type from "~types/type"
import { INITIAL_DATA } from "~components/initialData";

const bucket = getBucket<type.myBucket>('myBucket');

export const readRestTime = async () => {
  // ローカルストレージから取得
  const res = await bucket.get({ restTime: INITIAL_DATA.REST_TIME })
  return res.restTime
}

export const updateRestTime = async (newRestTimeAry: type.restTime[]) => {
  await bucket.set({ restTime: newRestTimeAry })
}

