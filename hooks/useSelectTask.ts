import { useContext, useState } from "react";
import * as context from "~components/Provider/MyProvider";
import { INITIAL_DATA } from "~components/initialData";

const useSelectTask = (taskId: string) => {
  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)

  const isSelected = selectedTaskId === taskId

  const onChangeSelect = () => {
    // すでに選択済みなら選択を外す
    if (isSelected) {
      setSelectedTaskId(INITIAL_DATA.SELECTED_TASK_ID)
    } else {
      setSelectedTaskId(taskId)
    }
  }

  return [isSelected, onChangeSelect] as const
}

export default useSelectTask