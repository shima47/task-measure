import { getBucket } from "@extend-chrome/storage";
import { useEffect, useState } from "react"
import * as type from "../../types/type"

const bucket = getBucket<type.myBucket>('myBucket');

const useSettingRestTime = (restTimeIndex: number) => {
  const [startRestTime, setStartRestTime] = useState("")
  const [endRestTime, setEndRestTime] = useState("")
  const [isSelect, setIsSelect] = useState(false)

  useEffect(() => { effectFn() }, [])

  const effectFn = async () => {
    const res = await bucket.get(["restTime"])
    const restTime: type.restTime = res.restTime[restTimeIndex]
    setStartRestTime(restTime.startRestTime)
    setEndRestTime(restTime.endRestTime)
    setIsSelect(restTime.isSelect)
  }

  const onChangeSelect = async () => {
    // ローカルストレージに保存
    updateRestTime(restTimeIndex, "isSelect", !isSelect)
    // state更新
    setIsSelect(current => !current)
  }

  const onChangeStartRestTime = async (e) => {
    const startRestTime = e.target.value
    // ローカルストレージに保存
    updateRestTime(restTimeIndex, "startRestTime", startRestTime)
    // state更新
    setStartRestTime(startRestTime)
  }

  const onChangeEndRestTime = async (e) => {
    const endRestTime = e.target.value
    // ローカルストレージに保存
    updateRestTime(restTimeIndex, "endRestTime", endRestTime)
    // state更新
    setEndRestTime(endRestTime)
  }

  const updateRestTime = async (restTimeIndex: number, key: string, value: string | boolean) => {
    // ローカルストレージから取得
    const res = await bucket.get(["restTime"])
    const restTimeAry: type.restTime[] = res.restTime
    // データを更新
    const newRestTime: type.restTime = { ...restTimeAry[restTimeIndex], [key]: value }
    restTimeAry[restTimeIndex] = newRestTime
    bucket.set({ restTime: restTimeAry })
  }

  return [startRestTime, endRestTime, isSelect, { onChangeStartRestTime, onChangeEndRestTime, onChangeSelect }] as const
}

export default useSettingRestTime
