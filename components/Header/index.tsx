import { Tooltip } from 'react-tooltip'
import useRunTask from "~features/runTask/useRunTask"
import useChangeOrder from "~features/changeOrder/useChangeOrder"
import useDeleteTask from "~features/deleteTask/useDeleteTask"
import useAdjustTime from "~features/adjustTime/useAdjustTime"
import useImportData from "~features/importData/useImportData"
import useExportData from "~features/exportData/useExportData"
import upArrowIcon from "data-base64:~assets/upArrow.svg"
import homeIcon from "data-base64:~assets/home.svg"
import downArrowIcon from "data-base64:~assets/downArrow.svg"
import importIcon from "data-base64:~assets/import.svg"
import exportIcon from "data-base64:~assets/export.svg"
import deleteIcon from "data-base64:~assets/delete.svg"
import reduceTimeIcon from "data-base64:~assets/reduceTime.svg"
import increaseTimeIcon from "data-base64:~assets/increaseTime.svg"
import stopIcon from "data-base64:~assets/stop.svg"
import settingIcon from "data-base64:~assets/setting.svg"


const Header = () => {
  // データ系
  const { onClickUpArrow, onClickDownArrow } = useChangeOrder()
  const { onClickReduceTime, onClickIncreaseTime } = useAdjustTime()
  const { onClickDelete, } = useDeleteTask()
  const { onClickStop, } = useRunTask()
  const [fileInputRef, { onClickImport, onChangeFile, }] = useImportData()
  const { onClickExport, } = useExportData()


  return (
    <div className="header">
      <div className="headerTitle">Task Measure</div>
      <div className="headerBtns">
        <div className="btn" id="homeBtn" onClick={onClickStop} >
          <img src={homeIcon} alt="ホーム"></img>
          <Tooltip anchorSelect="#homeBtn" content='ホーム' place='bottom' delayShow={700} />
        </div>
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
        <div className="btn" id='reduceTimeBtn' onClick={onClickReduceTime}>
          <img src={reduceTimeIcon} alt="時間減"></img>
          <Tooltip anchorSelect="#reduceTimeBtn" content='時間減' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='increaseTimeBtn' onClick={onClickIncreaseTime}>
          <img src={increaseTimeIcon} alt="時間増"></img>
          <Tooltip anchorSelect="#increaseTimeBtn" content='時間増' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='stopBtn' onClick={onClickStop}>
          <img src={stopIcon} alt="ストップ"></img>
          <Tooltip anchorSelect="#stopBtn" content='停止' place='bottom' delayShow={700} />
        </div>
        <div className="btn" id='settingBtn' onClick={onClickStop}>
          <img src={settingIcon} alt="設定"></img>
          <Tooltip anchorSelect="#settingBtn" content='設定' place='bottom' delayShow={700} />
        </div>
      </div>
    </div>
  )
}

export default Header
