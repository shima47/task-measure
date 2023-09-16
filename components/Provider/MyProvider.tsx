import { useState, useEffect, createContext } from "react"
import { getBucket } from '@extend-chrome/storage'
import * as type from "../../types/type"
import { INITIAL_DATA } from "./initialData"

export const allTaskContext = createContext<type.allTaskState>(null)
export const isOpenAryContext = createContext<type.isOpenAryState>(null)
export const orderContext = createContext<type.orderState>(null)
export const runningTaskContext = createContext<type.runningTaskState>(null)
export const selectedTaskIdContext = createContext<type.selectedTaskIdState>(null)
export const isImportingContext = createContext<type.isImportingState>(null)

const bucket = getBucket<type.myBucket>('my_bucket');

const MyProvider = ({ children }) => {
  // 最初に取得するが書き換えない
  const [allTask, setAllTask] = useState(INITIAL_DATA.ALL_TASK)
  const [isOpenAry, setIsOpenAry] = useState(INITIAL_DATA.IS_OPEN_ARY)
  // 頻繁に書き換えて再レンダリングする
  const [order, setOrder] = useState(INITIAL_DATA.ORDER)
  const [runningTask, setRunningTask] = useState(INITIAL_DATA.RUNNING_TASK)
  // 永続化はしないデータ
  const [selectedTaskId, setSelectedTaskId] = useState("")
  // JSONのインポート画面を切り替える
  const [isImporting, setIsImporting] = useState(false)

  useEffect(() => { effectFn() }, [])

  // ローカルストレージの読み込み後再レンダリングするため
  const effectFn = async () => {
    const value = await bucket.get()
    setAllTask(value.allTask)
    setIsOpenAry(value.isOpenAry)
    setOrder(value.order)
    setRunningTask(value.runningTask)
  }

  return (
    <allTaskContext.Provider value={[allTask, setAllTask]}>
      <isOpenAryContext.Provider value={[isOpenAry, setIsOpenAry]}>
        <orderContext.Provider value={[order, setOrder]}>
          <runningTaskContext.Provider value={[runningTask, setRunningTask]}>
            <selectedTaskIdContext.Provider value={[selectedTaskId, setSelectedTaskId]}>
              <isImportingContext.Provider value={[isImporting, setIsImporting]}>
                {children}
              </isImportingContext.Provider>
            </selectedTaskIdContext.Provider>
          </runningTaskContext.Provider>
        </orderContext.Provider>
      </isOpenAryContext.Provider>
    </allTaskContext.Provider>
  );
}


export default MyProvider
