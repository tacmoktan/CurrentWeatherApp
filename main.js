//information to reach API
const apiKey = "1445122ec90a4c0a1642a8af96e65a33";
const openWeatherMapUrl = "https://api.openweathermap.org/data/2.5/weather?";
const query = "q=";   //corresponding query to fetch data with city name

//selecting elements
let cityTextBox = document.getElementById('cityTextBox');

let displayFetchedData = document.querySelector('#displayFetchedData'); 
let fetchedData = document.querySelectorAll('.fetched-data');
let errorMessage = document.querySelector('#errorMessage');

//ajax call
async function getWeatherData() {
    let cityName = cityTextBox.value;
    let endpoint = `${openWeatherMapUrl}${query}${cityName}&APPID=${apiKey}`;
    try{
        const responseWeatherData = await fetch(endpoint);
        if(responseWeatherData.ok){
            console.log(responseWeatherData);
            const responseWeatherDataJson =  await responseWeatherData.json();
            renderResponseData(responseWeatherDataJson);
        }
        else
            throw new Error('Request failed!');
    
    }catch(error){
        console.log(error);
        errorMessage.innerHTML = "Make sure your city name is spelled correctly";
        errorMessage.style.display= "block";
    }
    
}

//event handler
function submitCity_clicked(){
    event.preventDefault();
    console.log('submit click');
    getWeatherData();
}

//rendering response function
const renderResponseData = (responseData) => {

    displayFetchedData.style.display="block";
    console.log(responseData);
    //data collection
    let temperature = responseData.main.temp - 273.15; //   kelvin to °C
    let weatherDescription = responseData.weather[0].description; 

    let pressure = responseData.main.pressure;         //   mBar
    let humidity = responseData.main.humidity;         //    %
    let visibility = responseData.visibility/1000;     //   km

    let wind = responseData.wind.speed;

    //placing data in the elements
    document.querySelector('#temperature .left').innerHTML = ` ${temperature.toFixed(2)}<sup>°C </sup>`;
    document.querySelector('#weatherDescription .right').innerHTML = ` ${weatherDescription} `;

    document.querySelector('#humidity .right').innerHTML = ` ${humidity} % `;
    document.querySelector('#pressure .right').innerHTML = ` ${pressure} mBar `;
    document.querySelector('#visibility .right').innerHTML = ` ${visibility} km `;

    document.querySelector('#wind').innerHTML = ` ${wind} km/hr `;
} 