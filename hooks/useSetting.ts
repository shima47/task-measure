import { useEffect, useState } from "react"
import { v4 as uuid } from "uuid"
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
    const newRestTime = { ...INITIAL_DATA.REST_TIME[0], id: getNewUUID(restTimeAry) }
    const newRestTimeAry = [...restTimeAry, newRestTime]
    await updateRestTime(newRestTimeAry)
    setRestTimeAry(newRestTimeAry)
  }

  return [restTimeAry, { onClickAddRestTime }] as const
}

const getNewUUID = (restTimeAry: type.restTime[]) => {
  //既存のOrderData配列に含まれないUUIDが出たらReturn
  const restTimeIdAry = restTimeAry.map(item => item.id)
  let tries = 0;
  while (tries < 100) {
    const id: string = uuid();
    if (!restTimeIdAry.includes(id)) { return id }
    tries++;
  }

  throw new Error("新しいUUIDが生成できませんでした。");
}

export default useSetting
