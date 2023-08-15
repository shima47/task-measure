import { useState, useEffect } from "react"
import { useStorage } from "@plasmohq/storage/hook"
import { ALL_TASK, ORDER, getDayTaskOrder } from "./common"
import "../css/common.css"


const DataImport = ({ grobalState }) => {

  const onClickCancel = () => {
    const [isImporting, setIsImporting] = grobalState.isImportingState
    setIsImporting(false)
  }

  return (
    <div className="dataImport">
      <textarea />
      <div className="btnRow">
        <div className="cancelBtn">Cancel</div>
        <div className="applyBtn">Import</div>
      </div>
    </div>
  )
}

export default DataImport


