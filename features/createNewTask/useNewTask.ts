import { useContext, } from "react"
import { v4 as uuid } from "uuid"
import * as type from "~types/type"
import * as context from "~components/Provider/MyProvider"


const useNewTask = (dayIndex: number) => {
  const [isOpenAry, setIsOpenAry] = useContext(context.isOpenAryContext)
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [order, setOrder] = useContext(context.orderContext)

  const onClickCreateTask = (event) => {
    // 親コンポーネントへのイベントの伝搬を防ぐ
    event.stopPropagation()

    // 新規作成
    createNewTask(dayIndex)

    // 新規作成時はアコーディオンを開く
    const newIsOpenAry = [...isOpenAry]
    newIsOpenAry[dayIndex] = true
    setIsOpenAry(newIsOpenAry)
  }

  const createNewTask = (dayIndex: number) => {
    const newId = getNewUUID(order) // かぶらないようにUUID発行

    // orderDataのdayIndexの仕切りの直後に挿入する
    const indexToInsert = order.indexOf(dayIndex);
    // spliceは指定したインデックスの直前に挿入する
    const newOrder = [...order]
    newOrder.splice(indexToInsert + 1, 0, newId)

    const newTask = { title: "タスク", time: 0, }
    const newAllTask = { ...allTask, [newId]: newTask }

    setAllTask(newAllTask)
    setOrder(newOrder)
  }

  const getNewUUID = (order: type.order) => {
    //既存のOrderData配列に含まれないUUIDが出たらReturn
    let tries = 0;
    while (tries < 100) {
      const id: string = uuid();
      if (!order.includes(id)) { return id }
      tries++;
    }

    throw new Error("新しいUUIDが生成できませんでした。");
  }

  return { onClickCreateTask, } as const
}

export default useNewTask