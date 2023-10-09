import { useLocation, useNavigate } from "react-router-dom"

const useNaviHooks = () => {
  const setNavigate = useNavigate()
  const location = useLocation()

  const onClickHome = () => {
    setNavigate("/popup.html")
  }

  const onClickSetting = () => {
    if (location.pathname !== "/setting") {
      setNavigate("/setting")
    } else {
      setNavigate("/popup.html")
    }
  }

  return { onClickHome, onClickSetting } as const
}

export default useNaviHooks