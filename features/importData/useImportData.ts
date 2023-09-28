import { useContext, useRef } from "react";
import * as context from "~components/Provider/MyProvider";


const useImportData = () => {
  const [, setAllTask] = useContext(context.allTaskContext)
  const [, setOrder] = useContext(context.orderContext)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onClickImport = async () => {
    fileInputRef.current?.click()
  }

  const onChangeFile = (event) => {
    if (!confirm("データをインポートして上書きしますか？")) return

    const files = event.currentTarget.files;
    // ファイルがなければ終了
    if (!files || files?.length === 0) return;
    // 先頭のファイルを取得
    const file = files[0];
    // 拡張子がJSONでなければ終了
    const extension = file.name.split(".").at(-1);
    if (extension === "json") return


  }

  return [fileInputRef, { onClickImport, onChangeFile, }] as const
}

export default useImportData