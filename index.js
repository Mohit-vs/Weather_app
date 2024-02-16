const apiKey = "eac07ff15d8ffa59a7fe4ea1f0ba1f5a";
const dayKey="76ec2356f91d1461f212c95e120562fc";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const dayUrl="https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";
const defualtCity="Delhi"
const searchBox = document.querySelector(".searchFrame input");
const searchBtn = document.querySelector(".searchFrame button");
const weatherIcon = document.querySelector(".weatherIcon");
const footer = document.querySelector(".footer");
const updateDays=(weatherItem)=>{
    let src=""
    if (weatherItem.weather[0].main == "Clouds") {
        src = "images/clouds.png";
      } else if (weatherItem.weather[0].main == "Rain") {
        src = "images/rain.png";
      } else if (weatherItem.weather[0].main == "Drizzle") {
        src = "images/drizzle.png";
      } else if (weatherItem.weather[0].main == "Mist") {
        src = "images/mist.png";
      } else if (weatherItem.weather[0].main == "Wind") {
        src = "images/wind.png";
      } else if (weatherItem.weather[0].main == "Snow") {
        src = "images/snow.png";
      } else if (weatherItem.weather[0].main == "Haze") {
        src = "images/haze.png";
      } else if (weatherItem.weather[0].main == "Clear") {
        src = "images/clear.png";
      }
      var timeComponents = weatherItem.dt_txt.split(" ")[1].split(":");
      var hour = parseInt(timeComponents[0], 10);
      
      // Convert to 12-hour format
      var ampm = hour >= 12 ? 'pm' : 'am';
      hour = hour % 12;
      hour = hour ? hour : 12; // Handle midnight (12:00 AM)
      
      var formattedTime = hour + ' ' + ampm;

    return `<div class="day" >
                <p id="day1">${formattedTime}</p>
                <p id="temp1">${Math.round(weatherItem.main.temp)+"°C"}</p>
                <img id="img1" class="dayIcon" src="${src}" alt="" />
                <p id="weth1">${weatherItem.weather[0].main}</p>
             </div>`
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    alert("Enter valid city name");
    searchBox.value=""
    return
  }
  var data = await response.json();

  const dayResponse=await fetch(dayUrl +city+ `&appid=${dayKey}`)

  var dayData=await dayResponse.json()

//   -------------------------------------array for 3 day forcast--------------------------------------------

footer.innerHTML=""
const threeDaysForcast = dayData.list;

threeDaysForcast.slice(0,3).forEach((weatherItem) => {
    footer.insertAdjacentHTML("beforeend", updateDays(weatherItem));
  })

  //select elements whom to change

  document.querySelector(".city").innerHTML=data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".cloudy").innerHTML = data.weather[0].main;

  //updating weather icon

  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  } else if (data.weather[0].main == "Wind") {
    weatherIcon.src = "images/wind.png";
  } else if (data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png";
  } else if (data.weather[0].main == "Haze") {
    weatherIcon.src = "images/haze.png";
  } else if (data.weather[0].main == "Haze") {
    weatherIcon.src = "images/haze.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  }
   searchBox.value="";
}

window.addEventListener("load", () => {
    checkWeather(defualtCity);
  });
searchBtn.addEventListener("click", (e) => {
    if(searchBox.value==""){
        alert("Enter a city name")
    }
    else
  checkWeather(searchBox.value);
});
