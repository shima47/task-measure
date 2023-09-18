import { useState, useEffect, useContext } from "react";
import * as context from "~components/Provider/MyProvider";


const useImportData = () => {
  const [allTask, setAllTask] = useContext(context.allTaskContext)
  const [order, setOrder] = useContext(context.orderContext)
  const [isImporting, setIsImporting] = useContext(context.isImportingContext)

  const [jsonData, setJsonData] = useState("")

  useEffect(() => {
    const dataObj = { allTask: allTask, order: order, }
    setJsonData(JSON.stringify(dataObj, null, 2))
  }, [])

  const onChangeTextarea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonData(event.target.value)
  }

  const onClickCancel = () => {
    setIsImporting(false)
  }

  const onClickApply = async () => {
    if (!confirm("データをインポートして上書きしますか？")) return
    // validationImport(json)

    try {
      const importedData = JSON.parse(jsonData)

      await setAllTask(importedData.allTask)
      await setOrder(importedData.order)

      setIsImporting(false)
    } catch (error) {
      alert("インポートに失敗しました")
    }
  }

  return [jsonData, { setJsonData, onChangeTextarea, onClickCancel, onClickApply }] as const
}

export default useImportData