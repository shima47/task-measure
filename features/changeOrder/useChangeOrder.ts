import { useContext, } from "react"
import * as type from "~types/type"
import * as context from "~components/Provider/MyProvider"


const useChangeOrder = () => {
  const [order, setOrder] = useContext(context.orderContext)
  const [selectedTaskId, setSelectedTaskId] = useContext(context.selectedTaskIdContext)

  const changeOrder = (direction: "forward" | "backward" = "forward") => {
    setOrder(current => {
      const currentIndex = current.indexOf(selectedTaskId);
      // 該当するIDが見つからない場合は元の配列を返す
      if (currentIndex === -1) { return current }

      const nextIndex = direction === "forward" ? currentIndex + 1 : currentIndex - 1;
      // 端の要素と入れ替えようとする場合は元の配列を返す
      if (nextIndex === 0 || nextIndex === current.length - 1) { return current }

      const copiedOrder = [...current];
      // 配列の要素を入れ替え
      [copiedOrder[currentIndex], copiedOrder[nextIndex]] = [copiedOrder[nextIndex], copiedOrder[currentIndex]];

      return copiedOrder
    });
  }

  const onClickUpArrow = () => {
    if (selectedTaskId === "") return
    changeOrder()
  }

  const onClickDownArrow = () => {
    if (selectedTaskId === "") return
    changeOrder("backward")
  }

  return { onClickUpArrow, onClickDownArrow }
}

export default useChangeOrder