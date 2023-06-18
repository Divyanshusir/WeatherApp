import React ,{useState , useEffect} from "react";

const api = process.env.REACT_APP_API_KEY

function App() {
  const [data, setData] = useState()
  const [city, setCity] = useState('Ayodhya')
  const [errormessage, setErrormessage] = useState('')
  const [hidden, setHidden] = useState(true)
  console.log(hidden)
  useEffect(() => {
    getData()
  }, [city])
  
  const getData = async  () => {
   await fetch(`https://api.weatherapi.com/v1/current.json?key=${api}&q=${city}`)
   .catch(err=>console.error(err))
   .then(res=>res.json())
   .then(res=>{if(res.error) {
      setErrormessage(res.error.message)
    } else {
      setData(res)
    }})
  }
 
  return(
    <div className="App">
      <h1 className="heading">Weather APP</h1>
      <div className="input" onChange={(e)=>setCity(e.target.value)}><input  placeholder="Enter City name:"></input></div>
      <div className="card-container">
        <div className={`card ${!hidden && "card-hidden"}`}>
            <div className="icon">
              <img src={data?data.current.condition.icon:'icon here'}/>
            </div>
            <div className="temp">
              TEMP
              <div className="temp-extra"> <div className="celcius">{data?data.current.temp_c:'-'} &deg;C</div>
              <div className="farehniet">{data?data.current.temp_f:'-'} &deg;F</div>   </div>
            </div>
            <div className="city icon">CITY:{data?data.location.name:'-'} , COUNTRY:{data?data.location.country:'-'} </div>
            <div className="time icon">LOCAL-TIME: {data? data.location.localtime: '-'} </div>
            <p onClick={()=>{setHidden(!hidden)}} className= {`Down-arrow ${!hidden && "hidden"}` } >  &#8964; </p>
            <div className = {` ${hidden ? "hidden" : "description"}` }>
                  <div className="extra-details icon"> 
                 <div className="box-values"> WIND SPEED : {data?data.current.wind_mph:'-'} mph</div>
                  <div className="box-values">PRESSURE : {data?data.current.pressure_mb:'-'} mb</div>
                  <div className="box-values">HUMIDITY : {data?data.current.humidity:'-'}</div>
                  <div className="box-values">CLOUD : {data?data.current.cloud:'-'} </div>
                  </div>
                  <p onClick={()=>{setHidden(!hidden)}} className="Up-arrow">  &#8963; </p>
            </div>
        </div>
      </div>
    </div>
  )
};
  

export default App