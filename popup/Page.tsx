import Header from "~components/Header";
import Home from "./Home";
import DataImport from "./importData"
import useIsImporting from "~features/importData/useIsImporting";


const Page = () => {
  // JSONのインポート画面を切り替える
  const [isImporting,] = useIsImporting()


  return (
    <div className="page">
      <Header />
      <div className="container">
        {
          isImporting ?
            <DataImport />
            :
            <Home />
        }
      </div>
    </div>
  )
}

export default Page

