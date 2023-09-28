import { useContext, useRef } from "react";
import * as context from "~components/Provider/MyProvider";


const useImportData = () => {
  const [, setAllTask] = useContext(context.allTaskContext)
  const [, setOrder] = useContext(context.orderContext)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ファイルの選択画面を開かせる
  const onClickImport = () => {
    fileInputRef.current?.click()
  }

  const onChangeFile = (event) => {
    const files = event.currentTarget.files;
    // ファイルがなければ終了
    if (!files || files?.length === 0) return;
    // 先頭のファイルを取得
    const file = files[0];
    // 拡張子がJSONでなければ終了
    const extension = file.name.split(".").at(-1);
    if (extension !== "json") return

    const reader = new FileReader()
    // 読み込み成功時のイベント
    reader.onload = event => {
      const content = event.target?.result
      try {
        const jsonData = JSON.parse(content as string)
        console.log(jsonData)

        if (!confirm("データをインポートして上書きしますか？")) return
        setAllTask(jsonData.allTask)
        setOrder(jsonData.order)
      } catch (error) {
        alert("インポートに失敗しました")
      }
    }
    // ファイル読み込み
    reader.readAsText(file)
  }

  return [fileInputRef, { onClickImport, onChangeFile, }] as const
}

export default useImportData