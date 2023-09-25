import { useContext } from "react"
import * as context from "~components/Provider/MyProvider";
import Header from "~components/Header";
import DataImport from "./importData"
import Home from "./Home";
import useIsImporting from "~features/importData/useIsImporting";


const Page = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [order, setOrder] = useContext(context.orderContext)

  const [runningTask, setRunningTask] = useContext(context.runningTaskInfoContext)
  const [isOpenAry, setIsOpenAry] = useContext(context.isOpenAryContext)

  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)
  // JSONのインポート画面を切り替える
  const [isImporting,] = useIsImporting()


  const grobalState = {
    allTaskState: [allTask, setAllTask],
    orderDataState: [order, setOrder],
    isOpenAryState: [isOpenAry, setIsOpenAry],
    runningTask: [runningTask, setRunningTask],
    selectedTaskIdState: [selectedTaskId, setSelectedTaskId],
  }

  return (
    <div className="page">
      <Header grobalState={grobalState} />
      <div className="container">
        {
          isImporting ?
            <DataImport />
            :
            <Home />
        }
      </div>
    </div>
  )
}

export default Page

