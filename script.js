
const ajaxRequestButton = document.querySelector('.ajax-request');
const promiseRequestButton = document.querySelector('.promise-request');
const asyncRequestButton = document.querySelector('.async-awit-request');
const cityDom = document.querySelector('.city');
const cityTempDom = document.querySelector('.temp');
const cityRainDom = document.querySelector('.rain');
const cityCloudDom = document.querySelector('.cloud');
const cityWindDom = document.querySelector('.wind');

const userData  = () => {
    const userApiID = document.querySelector('.api-id').value;
    const cityName = document.querySelector('.city-input').value;
    return {userApiID, cityName};
}

const ajaxRequestFunction = () => {
    const httpAjax = new XMLHttpRequest();
    const {cityName, userApiID} = userData();

    httpAjax.onreadystatechange = gettingWeatherInfo;
    httpAjax.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${userApiID}`);
    httpAjax.send();
}

const gettingWeatherInfo = (event) => {
    if (event.currentTarget.status === 200 && event.currentTarget.readyState === 4) {
        const response = JSON.parse(event.currentTarget.responseText);
        console.log(response);
        
        cityDom.textContent = response.name;
        cityTempDom.textContent = 'temp:' + (Math.round(response.main.temp) - 273);
        cityWindDom.textContent = 'wind:' + response.clouds.all;
        cityCloudDom.textContent = 'cloud:' + response.wind.speed;
    } 
}

const promiseFetchRequest = () => {
    const promiseWeather = new Promise((resolve, reject) => {
        const {cityName, userApiID} = userData();
        resolve(fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${userApiID}`)
        .then(response => response.json()));
    });

    promiseWeather.then(data => {
        console.log(data);
        cityDom.textContent = data.name;
        cityTempDom.textContent = 'temp:' + (Math.round(data.main.temp) - 273);
        cityWindDom.textContent = 'wind:' + data.clouds.all;
        cityCloudDom.textContent = 'cloud:' + data.wind.speed;
    });
}

function asyncRequestShell () {
    asyncFetchRequest().then(data => {
        console.log(data);
        cityDom.textContent = data.name;
        cityTempDom.textContent = 'temp:' + (Math.round(data.main.temp) - 273);
        cityWindDom.textContent = 'wind:' + data.clouds.all;
        cityCloudDom.textContent = 'cloud:' + data.wind.speed;
    })
}

const asyncFetchRequest = async () => {
    const {cityName, userApiID} = userData();
    const wheatherFetch = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${userApiID}`);
    return wheatherFetch.json();
}

function eventInit () {
    ajaxRequestButton.addEventListener('click', ajaxRequestFunction);

    promiseRequestButton.addEventListener('click', promiseFetchRequest);

    asyncRequestButton.addEventListener('click', asyncRequestShell);
}

eventInit();
