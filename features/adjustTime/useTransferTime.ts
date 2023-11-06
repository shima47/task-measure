import { useContext, } from "react";
import * as context from "~components/Provider/MyProvider";
import { INITIAL_DATA } from "~components/initialData";

const useTransferTime = (taskId: string) => {
  const [transferTaskId, setTransferTaskId] = useContext(context.transferTaskIdContext)

  const isTransfer = transferTaskId === taskId

  const onChangeTransfer = () => {
    // すでに選択済みなら選択を外す
    if (isTransfer) {
      setTransferTaskId(INITIAL_DATA.TRANSFER_TASK_ID)
    } else {
      setTransferTaskId(taskId)
    }
  }

  return [isTransfer, onChangeTransfer] as const
}

export default useTransferTime