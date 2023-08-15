import { useState, useEffect } from "react"
import { dataToJSON, applyImport } from "./common"
import "../css/common.css"
import "../css/dataImport.css"


const DataImport = ({ grobalState }) => {
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

  const onClickApply = () => {
    if (!confirm("データをインポートして上書きしますか？")) return

    try {
      applyImport(jsonData, grobalState)
      setIsImporting(false)
    } catch (error) {
      // validationImport(json)
      alert("インポートに失敗しました")
    }
  }


  return (
    <div className="dataImport">
      <textarea className="dataImportTextArea" value={jsonData} onChange={onChangeTextarea} />
      <div className="btnRow">
        <div className="btn dataImportApplyBtn" onClick={onClickApply}>Import</div>
        <div className="btn dataImportCancelBtn" onClick={onClickCancel} >Cancel</div>
      </div>
    </div>
  )
}

export default DataImport


