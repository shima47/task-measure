import { useState, useEffect, useContext } from "react";
import * as context from "~components/Provider/MyProvider";


const useIsImporting = () => {
  const [isImporting, setIsImporting] = useContext(context.isImportingContext)

  const onClickImport = () => {
    setIsImporting(current => !current)
  }
  return [isImporting, { onClickImport, }] as const
}

export default useIsImporting