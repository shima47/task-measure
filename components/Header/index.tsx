import useRunTask from "~features/runTask/useRunTask"
import useChangeOrder from "~features/changeOrder/useChangeOrder"
import useDeleteTask from "~features/deleteTask/useDeleteTask"
import useAdjustTime from "~features/adjustTime/useAdjustTime"
import useIsImporting from "~features/importData/useIsImporting"
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
  const [, { onClickImport }] = useIsImporting()
  const { onClickExport, } = useExportData()

  return (
    <div className="header">
      <div className="headerTitle">Task Measure</div>
      <div className="headerBtns">
        <div className="btn" onClick={onClickDownArrow}>
          <img src={upArrowIcon} alt="上矢印" ></img>
        </div>
        <div className="btn" onClick={onClickUpArrow}>
          <img src={downArrowIcon} alt="下矢印"></img>
        </div>
        <div className="btn" onClick={onClickDelete}>
          <img src={deleteIcon} alt="削除"></img>
        </div>
        <div className="btn" onClick={onClickImport}>
          <img src={importIcon} alt="JSONインポート"></img>
        </div>
        <div className="btn" onClick={onClickExport}>
          <img src={exportIcon} alt="JSONエクスポート"></img>
        </div>
        <div className="btn" onClick={onClickRewind}>
          <img src={rewindTimeIcon} alt="巻き戻し"></img>
        </div>
        <div className="btn" onClick={onClickForward}>
          <img src={forwardIcon} alt="早送り"></img>
        </div>
        <div className="btn" onClick={onClickStop}>
          <img src={stopIcon} alt="ストップ"></img>
        </div>
      </div>
    </div>
  )
}

export default Header
