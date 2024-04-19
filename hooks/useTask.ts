import { useContext, } from "react";
import * as context from "~components/Provider/MyProvider";


const useTask = (taskId: string) => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)

  const task = allTask[taskId]

  // データ上にプロパティがない場合の対応 
  if(task && !task.time){
    task.time = 0
  }
  if(task && !task.schedule){
    task.schedule = 0
  }

  return task
}

export default useTask