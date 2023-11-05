import { useEffect, useState } from "react"
import * as type from "~types/type"
import { readRestTime, updateRestTime, } from "~features/restTime/storage";
import { INITIAL_DATA } from "~components/initialData";


const useSetting = () => {
  const [restTimeAry, setRestTimeAry] = useState(INITIAL_DATA.REST_TIME)

  useEffect(() => { effectFn() }, [])

  // ローカルストレージからStateへ
  const effectFn = async () => {
    const restTimeAry = await readRestTime()
    setRestTimeAry(restTimeAry)
  }

  const onClickAddRestTime = async () => {
    const restTimeAry = await readRestTime()
    const newRestTimeAry = [...restTimeAry, INITIAL_DATA.REST_TIME[0]]
    await updateRestTime(newRestTimeAry)
    setRestTimeAry(newRestTimeAry)
  }
  return [restTimeAry, { onClickAddRestTime }] as const
}

export default useSetting
