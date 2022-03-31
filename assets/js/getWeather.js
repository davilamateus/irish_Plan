
function weather(){
    let weatherTemp = document.querySelector(".temperature--value");
    let weatherWind = document.querySelector(".weather--wind");
    let weatherSky = document.querySelector(".weather--sky");
    let cityHtml = document.querySelector('.temperature--city');
    
        city = userOptions.city;
        cityHtml.innerHTML = city;

        function requestApi () {
            let api = `https://api.openweathermap.org/data/2.5/weather?q=${city},ie&appid=82dc6076ac2dc00fcd49a3b1d3f698fc`
            fetch(api).then(response => response.json()).then(result => weatherDetails(result));
        }

        requestApi()
        function weatherDetails(info){
            weatherTemp.innerHTML = `${parseFloat((info.main.temp)-273.15).toFixed(1)}°`;
            weatherWind.innerHTML = `${parseFloat((info.wind.speed) *3.6).toFixed(1)} km/h`;
            weatherSky.innerHTML = info.weather[0].description;

            let sky = document.querySelector('.weather--sky').innerHTML
            if(localStorage.getItem('lang')=='pt-BR'){
                if(sky == 'clear sky'){weatherSky.innerHTML = 'Céu Limpo'}
                if(sky == 'fog'){weatherSky.innerHTML = 'Névoa'}
                if(sky == 'broken clouds'){weatherSky.innerHTML = 'Nuvem quebradas'}
            }
        }
        setInterval(() => {
            requestApi()
        }, 100000);

        function time(){
            setInterval(() => {
                let timeHtml = document.querySelector(".time--number");
                let timeH = new Date().getUTCHours().toLocaleString('en-ie', { timeZone: "Europe/Dublin" });
                let timeM = new Date().getUTCMinutes().toLocaleString('en-ie', { timeZone: "Europe/Dublin" });
                if(timeM <10){
                    timeM = `0${new Date().getUTCMinutes().toLocaleString('en-ie', { timeZone: "Europe/Dublin" })}`;
                }
                let timeS = new Date().getSeconds().toLocaleString('en-ie', { timeZone: "Europe/Dublin" });
                if(timeS<10){
                    timeS = `0${new Date().getSeconds().toLocaleString('en-ie', { timeZone: "Europe/Dublin" })}`;

                }
                timeHtml.innerHTML = `${timeH}:${timeM}:${timeS}`;
                
            }, 1000);
        }
        time()
}