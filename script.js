//---------------------------------Set up key variables--------------------------------
var form = document.querySelector("#search-form");
var textInput = document.querySelector("#search-input");
var city;
var lat;
var lon;
var fqueryURL;
var buttonCity

/// ------------GET THE CHOSEN CITY FROM THE USER AND THEN GET THE CO-ORDINATES OF THE CITY TO USE IN THE NEXT API CALL---------------------

form.addEventListener('submit', (event) => {
  event.preventDefault();
  city = textInput.value;
  console.log(event);
  console.log(city)
  var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q= "+ city + "&limit=5&appid=30227bf7877b7afa67565b4290c5bd6d" 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //console.log(response)
    lat = response[0].lat;
    lon = response[0].lon
    //console.log(city + "latitude is " + lat);
    //console.log(city + "longitude is " + lon)
  })
  .then(function(){

    //console.log("New function citiy is " + city)
    //console.log("New function citiy lat " + lat)
    //console.log("New function citiy lon " + lon)
    fqueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=30227bf7877b7afa67565b4290c5bd6d"
    //console.log("The full url for the forecast is " + fqueryURL);

    $.ajax({
        url: fqueryURL,
        method: "GET"
      }).then(function(response) {
      // console.log("this is the weather forcast API Call");  
      //console.log(response);
      //console.log(response.city)
      var weatherData = response
  
    
    //-----------------DISPLAY TODAY'S FORECAST FOR CHOSEN CITY ON THE PAGE ------------------------------
    
    var todayWeather = document.querySelector("#today")
    todayWeather.innerHTML = "";
    
    var nameDate =  document.createElement("h6");
    var fulldate = weatherData.list[0].dt_txt
    var dateSlice = fulldate.slice(0,10)
    console.log("Date slice is : " + dateSlice)
    nameDate.innerHTML = `${city}: ${dateSlice}`
    //nameDate.innerHTML = `${city}:( ${weatherData.list[2].dt_txt})`
    var icon = weatherData.list[0].weather.icon
    todayWeather.appendChild(nameDate);
    // //---------------//
    var todayTemp =  document.createElement("p");
    todayTemp.innerHTML = `Temp: ${weatherData.list[0].main.temp} *C`
    todayWeather.appendChild(todayTemp);
    // //------------------------
    var todayWind=  document.createElement("p");
    todayWind.innerHTML = `Wind: ${weatherData.list[0].wind.speed} KPH`
    todayWeather.appendChild(todayWind);
    
    // //------
    var todayHumid = document.createElement("p");
    todayHumid.innerHTML = `Humidity: ${weatherData.list[0].main.humidity} %`
    todayWeather.appendChild(todayHumid);
    var buttonArea = document.querySelector("#history")
  
    //-----------DISPLAY THE 5 DAY FORECAST ON THE PAGE.......................................//

       x = 0
        var days = [1,2,3,4,5,];
        var listNo =[1,9,17,25,33]

        var forecastWeather = document.querySelector("#forecast")
        var forediv = document.createElement("div")
        
        var fiveDay = document.querySelector("#forecastSection")
        
        fiveDay.innerHTML = "";
    

        for (let i = 0; i < days.length; i++){

           
    var forediv = document.createElement("div");
    forediv.setAttribute("id", "foreDiv");

    var nameDate =  document.createElement("h6");
    //nameDate.innerHTML = `${city}: ${dateSlice}`
    nameDate.innerHTML = ` ${weatherData.list[listNo[x]].dt_txt}`
    forediv.appendChild(nameDate);
    // //---------------//
    var todayTemp =  document.createElement("p");
    todayTemp.innerHTML = `Temp: ${weatherData.list[x].main.temp} *C`
    forediv.appendChild(todayTemp);
    // //------------------------ 
    var todayWind=  document.createElement("p");
    todayWind.innerHTML = `Wind: ${weatherData.list[x].wind.speed} KPH`
    forediv.appendChild(todayWind);
    
    // //------
    var todayHumid = document.createElement("p");
    todayHumid.innerHTML = `Humidity: ${weatherData.list[x].main.humidity} %`
    forediv.appendChild(todayHumid);
    
    fiveDay.appendChild(forediv);

        x = x +1

  
        }        

        //------------------SET UP BUTTON FOR ANY CITY SEARCHED FOR + EVENTLISTNER TO RUN FUNCTION CITYBUTTONSEARCH -----------------
        textInput.value = " ";
        var newButton = document.createElement("button");
        newButton.innerText = city;
        newButton.setAttribute("id","cityButton")
        buttonArea.appendChild(newButton);

        buttonArea.addEventListener("click",function(event){
            console.log(event.target);
            var buttoninfo = event.target.innerText
            console.log("chosen button is " + buttoninfo)
            city = buttoninfo
           citybuttonSearch()
        })
       
      });

    });
})


//---------CITYBUTTONSEARCH FUNCTION - runs same API call for weather but removes creation of new button ---------------


function citybuttonSearch(){
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q= "+ city + "&limit=5&appid=30227bf7877b7afa67565b4290c5bd6d" 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)
      lat = response[0].lat;
      lon = response[0].lon
      console.log(city + "latitude is " + lat);
      console.log(city + "longitude is " + lon)
    })
    .then(function(){
  
      console.log("New function citiy is " + city)
      console.log("New function citiy lat " + lat)
      console.log("New function citiy lon " + lon)
      fqueryURL = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=30227bf7877b7afa67565b4290c5bd6d"
      console.log("The full url for the forecast is " + fqueryURL);
  
      $.ajax({
          url: fqueryURL,
          method: "GET"
        }).then(function(response) {
        // console.log("this is the weather forcast API Call");  
        console.log(response);
        console.log(response.city)
        var weatherData = response
        console.log("This is the variable weatherData");
        console.log(weatherData)
       
      
      //-----------------Today Forecast-------------------------------
      
      var todayWeather = document.querySelector("#today")
      todayWeather.innerHTML = "";
    
      var nameDate =  document.createElement("h6");
      nameDate.innerHTML = `${city}:( ${weatherData.list[2].dt_txt})`
      todayWeather.appendChild(nameDate);
      // //---------------//
      var todayTemp =  document.createElement("p");
      todayTemp.innerHTML = `Temp: ${weatherData.list[2].main.temp} *C`
      todayWeather.appendChild(todayTemp);
      // //------------------------
      var todayWind=  document.createElement("p");
      todayWind.innerHTML = `Wind: ${weatherData.list[2].wind.speed} KPH`
      todayWeather.appendChild(todayWind);
      
      // //------
      var todayHumid = document.createElement("p");
      todayHumid.innerHTML = `Humidity: ${weatherData.list[2].main.humidity} %`
      todayWeather.appendChild(todayHumid);
      var buttonArea = document.querySelector("#history")
    
      //-----------5 day forecast.......................................//
  
         x = 0
          var days = [1,2,3,4,5,];
          var listNo =[1,9,17,25,33]
  
          var forecastWeather = document.querySelector("#forecast")
          var forediv = document.createElement("div")
          
          var fiveDay = document.querySelector("#forecastSection")
          
          fiveDay.innerHTML = "";
      
  
          for (let i = 0; i < days.length; i++){
  
             
      var forediv = document.createElement("div");
      forediv.setAttribute("id", "foreDiv");
  
      var nameDate =  document.createElement("h6");
      nameDate.innerHTML = ` ${weatherData.list[listNo[x]].dt_txt}`
      forediv.appendChild(nameDate);
      // //---------------//
      var todayTemp =  document.createElement("p");
      todayTemp.innerHTML = `Temp: ${weatherData.list[x].main.temp} *C`
      forediv.appendChild(todayTemp);
      // //------------------------ 
      var todayWind=  document.createElement("p");
      todayWind.innerHTML = `Wind: ${weatherData.list[x].wind.speed} KPH`
      forediv.appendChild(todayWind);
      
      // //------
      var todayHumid = document.createElement("p");
      todayHumid.innerHTML = `Humidity: ${weatherData.list[x].main.humidity} %`
      forediv.appendChild(todayHumid);
      
      fiveDay.appendChild(forediv);
  
          x = x+1

          }        
          
  
        });
  
      });

}
//---------End of repeated code----------
