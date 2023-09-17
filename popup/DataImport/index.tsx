import { useDataImport } from "~features/DataImport/useDataImport"

const DataImport = () => {
  const [jsonData, { onChangeTextarea, onClickApply, onClickCancel }] = useDataImport()

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


