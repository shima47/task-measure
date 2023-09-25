import { useContext } from "react"
import * as context from "~components/Provider/MyProvider";
import DayDiv from "~components/DayDiv"


const DAY_OF_WEEK_ARY = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.",]

const Home = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [order, setOrder] = useContext(context.orderContext)

  const [runningTask, setRunningTask] = useContext(context.runningTaskInfoContext)
  const [isOpenAry, setIsOpenAry] = useContext(context.isOpenAryContext)

  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)

  console.dir(allTask)


  const grobalState = {
    allTaskState: [allTask, setAllTask],
    orderDataState: [order, setOrder],
    isOpenAryState: [isOpenAry, setIsOpenAry],
    runningTask: [runningTask, setRunningTask],
    selectedTaskIdState: [selectedTaskId, setSelectedTaskId],
  }

  return (
    <div className="home">
      {
        DAY_OF_WEEK_ARY.map((item, index) => {
          return <DayDiv
            key={item}
            dayIndex={index}
            dOfW={item}
            grobalState={grobalState}
          />
        })
      }
    </div>
  )
}

export default Home

