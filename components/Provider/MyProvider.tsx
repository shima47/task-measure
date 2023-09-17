import { useState, useEffect, createContext } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { getBucket } from '@extend-chrome/storage'
import * as type from "../../types/type"
import { INITIAL_DATA } from "./initialData"

export const allTaskContext = createContext(null)
export const isOpenAryContext = createContext(null)
export const orderContext = createContext(null)
// export const runningTaskContext = createContext<type.runningTaskState>(null)
export const doingTaskIdContext = createContext(null)
export const startTimeContext = createContext(null)
export const selectedTaskIdContext = createContext(null)
export const isImportingContext = createContext(null)

const bucket = getBucket<type.myBucket>('my_bucket');

const MyProvider = ({ children }) => {
  const [allTask, setAllTask] = useStorage("taskData", INITIAL_DATA.ALL_TASK)
  const [order, setOrder] = useStorage("orderData", INITIAL_DATA.ORDER)

  const [doingTaskId, setDoingTaskId] = useStorage("doingTaskId", "")
  const [startTime, setStartTime] = useStorage("startTime", 0)
  const [isOpenAry, setIsOpenAry] = useStorage("isOpen", INITIAL_DATA.IS_OPEN_ARY)

  const [selectedTaskId, setSelectedTaskId] = useState("")
  // JSONのインポート画面を切り替える
  const [isImporting, setIsImporting] = useState(false)

  useEffect(() => { effectFn() }, [])

  // ローカルストレージの読み込み後再レンダリングするため
  const effectFn = async () => {
    // const value = await bucket.get()
    // setAllTask(value.allTask)
    // setIsOpenAry(value.isOpenAry)
    // setOrder(value.order)
    // setRunningTask(value.runningTask)
  }

  return (
    <allTaskContext.Provider value={[allTask, setAllTask]}>
      <isOpenAryContext.Provider value={[isOpenAry, setIsOpenAry]}>
        <orderContext.Provider value={[order, setOrder]}>
          {/* <runningTaskContext.Provider value={[runningTask, setRunningTask]}> */}
          <doingTaskIdContext.Provider value={[doingTaskId, setDoingTaskId]}>
            <startTimeContext.Provider value={[startTime, setStartTime]}>
              <selectedTaskIdContext.Provider value={[selectedTaskId, setSelectedTaskId]}>
                <isImportingContext.Provider value={[isImporting, setIsImporting]}>
                  {children}
                </isImportingContext.Provider>
              </selectedTaskIdContext.Provider>
            </startTimeContext.Provider>
          </doingTaskIdContext.Provider>
          {/* </runningTaskContext.Provider> */}
        </orderContext.Provider>
      </isOpenAryContext.Provider>
    </allTaskContext.Provider>
  );
}


export default MyProvider
