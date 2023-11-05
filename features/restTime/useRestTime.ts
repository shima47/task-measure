import { useContext, useEffect, useState } from "react"
import * as type from "~types/type"
import { INITIAL_DATA } from "~components/initialData";
import { restTimeAryContext } from "~components/Provider/MyProvider";
import { readRestTime, updateRestTime, } from "~features/restTime/storage";


const useRestTime = (restTimeIndex: number) => {
  const [restTime, setRestTime] = useState(INITIAL_DATA.REST_TIME[0])
  const [, setRestTimeAry] = useContext(restTimeAryContext)

  useEffect(() => { effectFn() }, [])

  const effectFn = async () => {
    const restTimeAry = await readRestTime()
    setRestTime(restTimeAry.at(restTimeIndex))
  }

  const onChangeSelect = async () => {
    // ローカルストレージに保存
    updateRestTimeValue(restTimeIndex, "isSelect", !restTime.isSelect)
    // state更新
    setRestTime(current => ({ ...current, isSelect: !current.isSelect }))
  }

  const onChangeStartRestTime = async (e) => {
    const startRestTime = e.target.value
    // ローカルストレージに保存
    updateRestTimeValue(restTimeIndex, "start", startRestTime)
    // state更新
    setRestTime(current => ({ ...current, start: startRestTime }))
  }

  const onChangeEndRestTime = async (e) => {
    const endRestTime = e.target.value
    // ローカルストレージに保存
    updateRestTimeValue(restTimeIndex, "end", endRestTime)
    // state更新
    setRestTime(current => ({ ...current, end: endRestTime }))
  }

  const onClickDeleteRestTime = async () => {
    const restTimeAry = await readRestTime()
    // restTimeIndexの要素を削除
    const newRestTimeAry = restTimeAry.toSpliced(restTimeIndex, 1)
    // ローカルストレージに保存
    await updateRestTime(newRestTimeAry)
    // state更新
    setRestTimeAry(newRestTimeAry)
  }

  return [restTime, { onChangeStartRestTime, onChangeEndRestTime, onChangeSelect, onClickDeleteRestTime }] as const
}

const updateRestTimeValue = async (restTimeIndex: number, key: type.restTimeKeys, value: type.restTimeValues) => {
  // ローカルストレージから取得
  const restTimeAry = await readRestTime()
  // データを更新
  const newRestTime: type.restTime = { ...restTimeAry.at(restTimeIndex), [key]: value }
  const newRestTimeAry = restTimeAry.with(restTimeIndex, newRestTime)
  await updateRestTime(newRestTimeAry)
}

export default useRestTime
