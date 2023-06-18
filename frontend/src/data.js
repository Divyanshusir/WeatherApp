export const getData = () => fetch('https://api.weatherapi.com/v1/current.json?key=16eafbd481c94ad980e153319231506&q=London')
.then((res)=>res.json())
.catch(err=>console.error(err))