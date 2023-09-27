import { useContext } from "react";
import * as context from "~components/Provider/MyProvider";


const useExportData = () => {
  const [allTask,] = useContext(context.allTaskContext)
  const [order,] = useContext(context.orderContext)

  const onClickExport = () => {
    const fileName = 'data'
    const fileNameWithJson = `${fileName}.json`
    try {
      // validationImport(json)
      const dataObj = { allTask: allTask, order: order, }
      const blobData = new Blob(
        [JSON.stringify(dataObj, null, 2)],
        { type: 'application/json' }
      )
      const url = URL.createObjectURL(blobData)

      chrome.downloads.download({
        url: url,
        filename: fileNameWithJson
      })
    } catch (error) {
      alert("エクスポートに失敗しました")
    }
  }

  return { onClickExport, } as const
}

export default useExportData