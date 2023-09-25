import DayDiv from "~components/DayDiv"


const DAY_OF_WEEK_ARY = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.",]

const Home = () => {
  return (
    <div className="home">
      {
        DAY_OF_WEEK_ARY.map((item, index) => {
          return <DayDiv
            key={item}
            dayIndex={index}
            dOfW={item}
          />
        })
      }
    </div>
  )
}

export default Home

