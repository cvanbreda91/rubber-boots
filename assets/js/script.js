// define global variables
var city = "";
var key = 0;
var apiUrlForcast="";
var todayDate = Date.today();
var dayFuture = "";
var tempFuture = "";
var windFuture = "";
var humidityFuture = "";
var mainFuture = "";
var cityHistoric = "";

var getWeatherData = function() {
    // format the api url
    var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=1ab8398b2b4b21c830b5cf8c3767d385&units=metric"
    // make a get request to url
    fetch(apiUrlCurrent)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            //get longitude and latitude coordinates - original call did not have UV index but could search by city
            var latUpdate=data.coord.lat;
            var lonUpdate=data.coord.lon;
            city = data.name+" - "+data.sys.country+" - "+todayDate.toString("ddd. MMM d, yyyy");
            //create new link for 2nd fetch with longitude and lattitude coordinates
            apiUrlForcast="https://api.openweathermap.org/data/3.0/onecall?lat="+latUpdate+"&lon="+lonUpdate+"&exclude=hourly,minutely,current,alert,&appid=1ab8398b2b4b21c830b5cf8c3767d385&units=metric"
            fetch(apiUrlForcast)
              .then(function(response) {
                if(response.ok) {
                  response.json().then(function(data){
                    //get required weather measuements
                    var tempCurrent = data.daily[0].feels_like.day+" °C";
                    var windCurrent = data.daily[0].wind_speed+" m/s";
                    var humidityCurrent = data.daily[0].humidity+"%";
                    var uvCurrent = data.daily[0].uvi;
                    var mainCurrent = data.daily[0].weather[0].main;
                    //add them to the website html
                    $("#border").addClass("border border-success rounded");
                    $("#todayTemp").text("Temp: "+tempCurrent);
                    $("#todayWind").text("Wind: "+windCurrent);
                    $("#todayHumidity").text("Humidity: "+humidityCurrent);
                    $("#todayCity").text(city)
                    //create if statement to display icon for main weather type - must add and remove classes or the icon doesn't change when a new city is selected
                    if (mainCurrent == "Clouds") {
                      $("#weatherIcon")
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-cloud");
                    }
                    if (mainCurrent == "Thunderstorm") {
                      $("#weatherIcon")
                        .removeClass("fas fa-cloud")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-bolt");
                    }
                    if (mainCurrent == "Drizzle") {
                      $("#weatherIcon")
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-cloud-rain");
                    }
                    if (mainCurrent == "Rain") {
                      $("#weatherIcon")
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-cloud-showers-heavy");
                    }
                    if (mainCurrent == "Snow") {
                      $("#weatherIcon")
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("fas fa-cloud")
                        .removeClass("fas fa-sun")
                        .addClass("far fa-snowflake");
                    }
                    if (mainCurrent == "Clear") {
                      $("#weatherIcon")
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-cloud")
                        .addClass("fas fa-sun");
                    }
                    //add colours to index based on severity of uv rays
                    if (uvCurrent<=4){
                      $("#todayIndex").text("UV Index: "+uvCurrent)
                                      .removeClass("bg-warning")
                                      .removeClass("bg-danger")
                                      .addClass("bg-success");
                    }
                    if (uvCurrent>4 && uvCurrent<=7){
                      $("#todayIndex").text("UV Index: "+uvCurrent)
                                      .removeClass("bg-success")
                                      .removeClass("bg-danger")
                                      .addClass("bg-warning");
                    }
                    if (uvCurrent>7){
                      $("#todayIndex").text("UV Index: "+uvCurrent)
                                      .removeClass("bg-success")
                                      .removeClass("bg-warning")
                                      .addClass("bg-danger");
                    }
                  // create 5 day forcast cards
                  if (dayFuture === ""){
                  for (var i=1; i<6; i++){
                    dayFuture = Date.today().addDays(i).toString("MM/dd/yyyy")
                    //rounded temp to save on space
                    tempFuture = Math.round(data.daily[i].feels_like.day)+" °C";
                    windFuture = data.daily[i].wind_speed+" m/s";
                    humidityFuture = data.daily[i].humidity+"%";
                    mainFuture = data.daily[i].weather[0].main;
                    $("#forcast").text("5 Day Forcast");
                    $("#card-deck").append('<div class="card bg-primary" id="newId'+[i]+'"><div class="card-body text-left"><div class="card-text"><h5><strong>'+dayFuture+'</strong></h5><h3 id="icon'+[i]+'"></h3><p>Temp: '+tempFuture+'</p><p>Humidity: '+humidityFuture+'</p><p>Wind: '+windFuture+'</p></div></div></div>');
                    if (mainFuture ==="Clouds"){
                      $("#icon"+[i]).addClass("fas fa-cloud")
                    }
                    if (mainFuture ==="Thunderstorm"){
                      $("#icon"+[i]).addClass("fas fa-bolt")
                    }
                    if (mainFuture ==="Drizzle"){
                      $("#icon"+[i]).addClass("fas fa-cloud-rain")
                    }
                    if (mainFuture ==="Rain"){
                      $("#icon"+[i]).addClass("fas fa-cloud-showers-heavy")
                    }
                    if (mainFuture ==="Clear"){
                      $("#icon"+[i]).addClass("fas fa-sun")
                    }
                    if (mainFuture ==="Snow"){
                      $("#icon"+[i]).addClass("far fa-snowflake")
                    }}
                  

                  }
                    //to overwrite passed data if city is defined perviously
                    else {
                      $("#newId1").remove();
                      $("#newId2").remove();
                      $("#newId3").remove();
                      $("#newId4").remove();
                      $("#newId5").remove();
                      for (var i=1; i<6; i++){
                      dayFuture = Date.today().addDays(i).toString("MM/dd/yyyy")
                    tempFuture = Math.round(data.daily[i].feels_like.day)+" °C";
                    windFuture = data.daily[i].wind_speed+" m/s";
                    humidityFuture = data.daily[i].humidity+"%";
                    mainFuture = data.daily[i].weather[0].main;
                      $("#card-deck").append('<div class="card bg-primary" id="newId'+[i]+'"><div class="card-body text-left"><div class="card-text"><h5><strong>'+dayFuture+'</strong></h5><p id="icon'+[i]+'"></p><p>Temp: '+tempFuture+'</p><p>Humidity: '+humidityFuture+'</p><p>Wind: '+windFuture+'</p></div></div></div>');
                      if (mainFuture ==="Clouds"){
                        $("#icon"+[i]).addClass("fas fa-cloud")
                      }
                      if (mainFuture ==="Thunderstorm"){
                        $("#icon"+[i]).addClass("fas fa-bolt")
                      }
                      if (mainFuture ==="Drizzle"){
                        $("#icon"+[i]).addClass("fas fa-cloud-rain")
                      }
                      if (mainFuture ==="Rain"){
                        $("#icon"+[i]).addClass("fas fa-cloud-showers-heavy")
                      }
                      if (mainFuture ==="Clear"){
                        $("#icon"+[i]).addClass("fas fa-sun")
                      }
                      if (mainFuture ==="Snow"){
                        $("#icon"+[i]).addClass("far fa-snowflake")
                      }}}
                  
                  })
                }
              }

              )
              

          });
          //bad city
        } else {
          alert('Error: Location Not Found - check your spelling');
        }
      })
      //call error
      .catch(function(error) {
        alert("Unable to connect to OpenWeather API");
      });
      
  }

// get city set in local storage
$("#button").click(function(event) {
    key=key+1
    city = $("#city").val();
    localStorage.setItem('city'+key, JSON.stringify(city));
    getWeatherData();

//create buttons based on past searches to make re-searching same location easier
    $("#cityId").append('<button class="btn btn-info btn-block" id="button'+key+'">'+city+'</button>')
    
})

//add event listeners to historical city buttons
$(document).on('click', '#button1', function() {
  city = JSON.parse(localStorage.getItem('city1'));
  getWeatherData()
});

$(document).on('click', '#button2', function() {
  city = JSON.parse(localStorage.getItem('city2'));
  getWeatherData()
});

$(document).on('click', '#button3', function() {
  city = JSON.parse(localStorage.getItem('city3'));
  getWeatherData()
});

$(document).on('click', '#button4', function() {
  city = JSON.parse(localStorage.getItem('city1'));
  getWeatherData()
});

$(document).on('click', '#button5', function() {
  city = JSON.parse(localStorage.getItem('city2'));
  getWeatherData()
});

$(document).on('click', '#button6', function() {
  city = JSON.parse(localStorage.getItem('city3'));
  getWeatherData()
});