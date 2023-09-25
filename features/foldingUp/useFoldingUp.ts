import { useContext } from "react";
import * as context from "~components/Provider/MyProvider";


const useFoldingUp = (dayIndex: number) => {
  const [isOpenAry, setIsOpenAry] = useContext(context.isOpenAryContext)

  const onClickDayTitle = () => {
    setIsOpenAry(current => {
      const newIsOpenAry = [...current]
      newIsOpenAry[dayIndex] = !current[dayIndex]
      return newIsOpenAry
    })
  }

  return { onClickDayTitle, } as const
}

export default useFoldingUp