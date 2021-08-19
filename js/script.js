let searchInput = document.querySelector('#searchInput');
let searchBtn = document.querySelector('#searchbtn');
let cityNameplace = document.querySelector('#cityName');
let tempPlace = document.querySelector('#temp');
let tempIcon = document.querySelector('#icon');
let about = document.querySelector('#about');
let speed = document.querySelector('#speed');
let allData = []
async function fetchData(cityname) {
    allData.pop();
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=1601ecaa13b60cc36b8bd6815381f632`)
        .then((res) => res.json())
        .then(data => allData.push(data))
        .catch(e => console.log('err' + e.message));
};

searchBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await fetchData(searchInput.value)
    if (searchInput.value === '' || searchInput.value === undefined) {
        return alert('please add a city');
    }
    await allData.map(data => {
        if (data.cod == 404) {
            return alert('404 city not found');
        } else {
            cityNameplace.innerHTML = data.name;
            tempIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            about.innerHTML = data.weather[0].description;
            tempPlace.innerHTML = `${(data.main.temp - 273.16).toFixed(1)} centigrade`;
            speed.innerHTML = `${data.wind.speed} km/h`;
        }
    })
})