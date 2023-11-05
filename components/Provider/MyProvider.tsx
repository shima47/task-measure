import { useState, useEffect, createContext } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { getBucket } from '@extend-chrome/storage'
import * as type from "../../types/type"
import { INITIAL_DATA } from "../initialData"

export const allTaskContext = createContext(null)
export const isOpenAryContext = createContext(null)
export const orderContext = createContext(null)
export const runningTaskInfoContext = createContext<type.runningTaskInfoState>(null)
export const selectedTaskIdContext = createContext(null)
export const isImportingContext = createContext(null)
export const restTimeAryContext = createContext(null)

const bucket = getBucket<type.myBucket>('myBucket');

const MyProvider = ({ children }) => {
  const [allTask, setAllTask] = useStorage("taskData", INITIAL_DATA.ALL_TASK)
  const [order, setOrder] = useStorage("orderData", INITIAL_DATA.ORDER)

  const [runningTask, setRunningTask] = useStorage("runningTask", INITIAL_DATA.RUNNING_TASK)
  const [isOpenAry, setIsOpenAry] = useStorage("isOpen", INITIAL_DATA.IS_OPEN_ARY)

  const [selectedTaskId, setSelectedTaskId] = useState(INITIAL_DATA.SELECTED_TASK_ID)
  // JSONのインポート画面を切り替える
  const [isImporting, setIsImporting] = useState(INITIAL_DATA.IS_IMPORTING)

  const [restTimeAry, setRestTimeAry] = useState(INITIAL_DATA.REST_TIME)

  useEffect(() => { effectFn() }, [])

  // ローカルストレージの読み込み後再レンダリングするため
  const effectFn = async () => {
    // const value = await bucket.get()
    // setAllTask(value.allTask)
    // setIsOpenAry(value.isOpenAry)
    // setOrder(value.order)
    // setRunningTask(value.runningTask)
    // await bucket.set({ restTime: INITIAL_DATA.REST_TIME })
  }

  return (
    <allTaskContext.Provider value={[allTask, setAllTask]}>
      <isOpenAryContext.Provider value={[isOpenAry, setIsOpenAry]}>
        <orderContext.Provider value={[order, setOrder]}>
          <runningTaskInfoContext.Provider value={[runningTask, setRunningTask]}>
            <selectedTaskIdContext.Provider value={[selectedTaskId, setSelectedTaskId]}>
              <isImportingContext.Provider value={[isImporting, setIsImporting]}>
                <restTimeAryContext.Provider value={[restTimeAry, setRestTimeAry]}>
                  {children}
                </restTimeAryContext.Provider>
              </isImportingContext.Provider>
            </selectedTaskIdContext.Provider>
          </runningTaskInfoContext.Provider>
        </orderContext.Provider>
      </isOpenAryContext.Provider>
    </allTaskContext.Provider>
  );
}


export default MyProvider
