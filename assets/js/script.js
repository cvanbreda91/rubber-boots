var city = "";
var key = 0;
var apiUrlForcast="";
var todayDate = Date.today();
var dayFuture = "";
var tempFuture = "";
var windFuture = "";
var humidityFuture = "";
var mainFuture = "";

var getWeatherData = function() {
    // format the api url
    var apiUrlCurrent = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=1ab8398b2b4b21c830b5cf8c3767d385&units=metric"
    // make a get request to url
    fetch(apiUrlCurrent)
      .then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            var latUpdate=data.coord.lat;
            var lonUpdate=data.coord.lon;
            city = data.name+" - "+data.sys.country+" - "+todayDate.toString("ddd. MMM d, yyyy");
            apiUrlForcast="https://api.openweathermap.org/data/3.0/onecall?lat="+latUpdate+"&lon="+lonUpdate+"&exclude=hourly,minutely,current,alert,&appid=1ab8398b2b4b21c830b5cf8c3767d385&units=metric"
            fetch(apiUrlForcast)
              .then(function(response) {
                if(response.ok) {
                  response.json().then(function(data){
                    console.log(data)
                    var tempCurrent = data.daily[0].feels_like.day+" °C";
                    var windCurrent = data.daily[0].wind_speed+" m/s";
                    var humidityCurrent = data.daily[0].humidity+"%";
                    var uvCurrent = data.daily[0].uvi;
                    var mainCurrent = data.daily[0].weather[0].main
                    console.log (mainCurrent);
                    $("#todayTemp").text("Temp: "+tempCurrent);
                    $("#todayWind").text("Wind: "+windCurrent);
                    $("#todayHumidity").text("Humidity: "+humidityCurrent);
                    // $("#todayIndex").text("UV Index: "+uvCurrent);
                    if (mainCurrent == "Clouds") {
                      $("#todayCity")
                        .text(city)
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-cloud");
                    }
                    if (mainCurrent == "Thunderstorm") {
                      $("#todayCity")
                        .text(city)
                        .removeClass("fas fa-cloud")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-bolt");
                    }
                    if (mainCurrent == "Drizzle") {
                      $("#todayCity")
                        .text(city)
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-cloud-rain");
                    }
                    if (mainCurrent == "Rain") {
                      $("#todayCity")
                        .text(city)
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-sun")
                        .addClass("fas fa-cloud-showers-heavy");
                    }
                    if (mainCurrent == "Snow") {
                      $("#todayCity")
                        .text(city)
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("fas fa-cloud")
                        .removeClass("fas fa-sun")
                        .addClass("far fa-snowflake");
                    }
                    if (mainCurrent == "Clear") {
                      $("#todayCity")
                        .text(city)
                        .removeClass("fas fa-bolt")
                        .removeClass("fas fa-cloud-rain")
                        .removeClass("fas fa-cloud-showers-heavy")
                        .removeClass("far fa-snowflake")
                        .removeClass("fas fa-cloud")
                        .addClass("fas fa-sun");
                    }
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
                  if (dayFuture === ""){
                  for (var i=1; i<6; i++){
                    dayFuture = Date.today().addDays(i).toString("MM/dd/yyyy")
                    tempFuture = Math.round(data.daily[i].feels_like.day)+" °C";
                    windFuture = data.daily[i].wind_speed+" m/s";
                    humidityFuture = data.daily[i].humidity+"%";
                    mainFuture = data.daily[i].weather[0].main;
                    $("#forcast").text("5 Day Forcast");
                    $("#card-deck").append('<div class="card bg-primary" id="newId'+[i]+'"><div class="card-body text-left"><div class="card-text"><h5><strong>'+dayFuture+'</strong></h5><p id="icon'+[i]+'"></p><p>Temp: '+tempFuture+'</p><p>Humidity: '+humidityFuture+'</p><p>Wind: '+windFuture+'</p></div></div></div>');
                    console.log(dayFuture, tempFuture, windFuture, humidityFuture,mainFuture)
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
                      console.log(dayFuture, tempFuture, windFuture, humidityFuture,mainFuture)
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
        } else {
          alert('Error: Location Not Found');
        }
      })
      
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
    $("#button").clone()
                .appendTo("#cityId")
                .attr("id","newButton"+key)
                .text(JSON.parse(localStorage.getItem('city'+key)))
    
})

function getLocalStorage(){
    for (var i=1; i<=localStorage.length; i++){
        $("#button").clone()
            .appendTo("#cityId")
            .attr("id","newButton"+key)
            .removeClass("btn-primary")
            .addClass("btn-info")
            .text(JSON.parse(localStorage.getItem('city'+[i])))
    }
};
getLocalStorage();

