const inp=document.getElementById("input")
const btn=document.querySelector("button")
const temp=document.querySelector(".temper")
const loc=document.querySelector(".locate")
const wind=document.querySelector("#wida")
const humid=document.querySelector("#huda")
const wIcon=document.getElementById("Wicon")
const disc=document.getElementById("desc")

btn.addEventListener("click",()=>{
    if(inp.value!=""){
       getAndPopulateData()
    
    
}})
inp.addEventListener("keyup",(e)=>{
    if(e.key=="Enter" && inp.value!=""){
        getAndPopulateData()
    }
   })
const request_cod=async (city)=>{
    response=await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=d250c80e09d0ea989ed5588d9ebae5a5&units=metric`)
    const data = await response.json();
    console.log(data);
    return  data
}
const request_weather=async(lat,lon)=>{
    response=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d250c80e09d0ea989ed5588d9ebae5a5&units=metric`)
    const data = await response.json();
    console.log(data);
    return  data

}
const getAndPopulateData=async()=>{
    try{
   
        const location= await request_cod(inp.value)
         
         const lat=location[0].lat
         const lon=location[0].lon
        const  info=await request_weather(lat,lon)
        temp.innerHTML=(info.main.temp) +"<span style='font-size:35px;'>&#8451;</span>"
        loc.textContent=location[0].name
        humid.textContent=info.main.humidity + " %"
        
        wind.textContent= info.wind.speed + " m/s"
        
        disc.textContent=info.weather[0].description
        if(info.weather[0].id==800){
         wIcon.src = "Icons/clear.svg";
        }
       else if(info.weather[0].id >= 801  && info.weather[0].id<=804){
         wIcon.src = "Icons/cloud.svg";
     }else if(info.weather[0].id >= 200 && info.weather[0].id <= 232){
         wIcon.src = "Icons/storm.svg";  
     }else if(info.weather[0].id >= 600 && info.weather[0].id <= 622){
         wIcon.src = "Icons/snow.svg";
     }else if(info.weather[0].id >= 701 && info.weather[0].id <= 781){
         wIcon.src = "Icons/haze.svg";
     }else if(info.weather[0].id >= 801 && info.weather[0].id <= 804){
         wIcon.src = "Icons/cloud.svg";
     }else if((info.weather[0].id >= 500 && info.weather[0].id <= 531) || (info.weather[0].id >= 300 && info.weather[0].id <= 321)){
         wIcon.src = "Icons/rain.svg";
     }
     
    }
    catch(e){
        alert(e)
    }

}