import { Tooltip } from 'react-tooltip'
import useRunTask from "~features/runTask/useRunTask"
import useChangeOrder from "~features/changeOrder/useChangeOrder"
import useDeleteTask from "~features/deleteTask/useDeleteTask"
import useAdjustTime from "~features/adjustTime/useAdjustTime"
import useImportData from "~features/importData/useImportData"
import useExportData from "~features/exportData/useExportData"
import upArrowIcon from "data-base64:~assets/upArrow.svg"
import downArrowIcon from "data-base64:~assets/downArrow.svg"
import importIcon from "data-base64:~assets/import.svg"
import exportIcon from "data-base64:~assets/export.svg"
import deleteIcon from "data-base64:~assets/delete.svg"
import forwardIcon from "data-base64:~assets/forward.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import rewindTimeIcon from "data-base64:~assets/rewindTime.svg"


const Header = () => {
  // データ系
  const { onClickUpArrow, onClickDownArrow } = useChangeOrder()
  const { onClickRewind, onClickForward } = useAdjustTime()
  const { onClickDelete, } = useDeleteTask()
  const { onClickStop, } = useRunTask()
  const [fileInputRef, { onClickImport, onChangeFile, }] = useImportData()
  const { onClickExport, } = useExportData()


  return (
    <div className="header">
      <div className="headerTitle">Task Measure</div>
      <div className="headerBtns">
        <div className="btn" id="upArrowBtn" onClick={onClickUpArrow} >
          <img src={upArrowIcon} alt="上矢印"></img>
          <Tooltip anchorSelect="#upArrowBtn" content='ひとつ上に' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id="downArrowBtn" onClick={onClickDownArrow}>
          <img src={downArrowIcon} alt="下矢印"></img>
          <Tooltip anchorSelect="#downArrowBtn" content='ひとつ下に' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id="deleteBtn" onClick={onClickDelete}>
          <img src={deleteIcon} alt="削除"></img>
          <Tooltip anchorSelect="#deleteBtn" content='削除' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='importBtn' onClick={onClickImport}>
          <img src={importIcon} alt="JSONインポート"></img>
          <input style={{ display: "none" }} ref={fileInputRef} type="file" accept='.json' onChange={onChangeFile} />
          <Tooltip anchorSelect="#importBtn" content='インポート' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='exportBtn' onClick={onClickExport}>
          <img src={exportIcon} alt="JSONエクスポート"></img>
          <Tooltip anchorSelect="#exportBtn" content='エクスポート' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='rewindBtn' onClick={onClickRewind}>
          <img src={rewindTimeIcon} alt="巻き戻し"></img>
          <Tooltip anchorSelect="#rewindBtn" content='巻き戻し' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='forwardBtn' onClick={onClickForward}>
          <img src={forwardIcon} alt="早送り"></img>
          <Tooltip anchorSelect="#forwardBtn" content='早送り' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='stopBtn' onClick={onClickStop}>
          <img src={stopIcon} alt="ストップ"></img>
          <Tooltip anchorSelect="#stopBtn" content='停止' place='bottom' delayShow={700} />
        </div>
      </div>
    </div>
  )
}

export default Header
