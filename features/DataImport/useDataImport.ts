import { useState, useEffect, useContext } from "react";
import * as type from "~components/Provider/type";
import { isImportingContext } from "~components/Provider/MyProvider";


export const useDataImport = (grobalState): type.useDataImport => {
  const [isImporting, setIsImporting] = grobalState.isImportingState
  const [jsonData, setJsonData] = useState("")

  useEffect(() => {
    setJsonData(dataToJSON(grobalState))
  }, [])

  const onChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(event.target.value)
  }

  const onClickCancel = () => {
    setIsImporting(false)
  }

  const onClickApply = async () => {
    if (!confirm("データをインポートして上書きしますか？")) return

    try {
      await applyImport(jsonData, grobalState)
      setIsImporting(false)
    } catch (error) {
      // validationImport(json)
      alert("インポートに失敗しました")
    }
  }

  return [jsonData, { setJsonData, onChangeTextarea, onClickCancel, onClickApply }]
}


const dataToJSON = (grobalState) => {
  const [allTask, setAllTask] = grobalState.allTaskState
  const [orderData, setOrderData] = grobalState.orderDataState

  const dataObj = {
    allTask: allTask,
    order: orderData,
  }

  // console.log(JSON.stringify(dataObj))
  return JSON.stringify(dataObj, null, 2)
}

const applyImport = async (json: string, grobalState) => {
  const [allTask, setAllTask] = grobalState.allTaskState
  const [orderData, setOrderData] = grobalState.orderDataState

  const dataObj = JSON.parse(json)
  const importedAllTask = dataObj.allTask
  const importedOrder = dataObj.order

  await setAllTask(importedAllTask)
  await setOrderData(importedOrder)
}