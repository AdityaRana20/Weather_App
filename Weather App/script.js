// Variables
const cityName = document.querySelector('#weatherInput');
const form = document.getElementById('weatherForm');
const myCity = document.getElementById('city');
const image = document.getElementById('weatherImage');
const weather = document.getElementById('weatherMain');
const temp = document.querySelector('.temp');
const dates = document.querySelector('.todayDates');
const times = document.getElementById('todayTime');
let date = new Date();

// Function to update time
function updateTime() {
    let leftDate = new Date();
    let hours = leftDate.getHours();
    let minutes = leftDate.getMinutes();
    let seconds = leftDate.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    let strTime = `${hours}h: ${minutes}m: ${seconds}s ${ampm}`;
    times.innerHTML = strTime;
}
setInterval(updateTime, 1000);

// Function work when user input the city name
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Updating the city name
    let city = cityName.value;
    const myWeatherContainer = document.querySelector('.weatherContainer');
    const apiID = `931f131dde3f4ae2fcbc3289fc646471`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiID}`;

    // Fetching data from the weather API
    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.cod === 200) {
            const tempValue = Math.round(data.main.temp);
            const weatherMain = data.weather[0].main;

            myCity.innerHTML = city;
            temp.innerHTML = `${tempValue}<span><sup>o</sup>C</span>`;
            weather.innerHTML = weatherMain;

            // Updating the images according to the weather
            let imageSrc = '';
            let bgColor = '';
            switch (weatherMain) {
                case 'Clear':
                    imageSrc = './Images/sunny.png';
                    bgColor = '#ec6e4c';
                    break;
                case 'Clouds':
                    imageSrc = './Images/cloudy.png';
                    bgColor = '#86d3d3';
                    break;
                case 'Rain':
                    imageSrc = './Images/rainy.png';
                    bgColor = '#494bcf';
                    break;
                case 'Drizzle':
                    imageSrc = './Images/drizzle.png';
                    bgColor = '#8ecfcf';
                    break;
                case 'Haze':
                    imageSrc = './Images/haze.png';
                    bgColor = '#d8ced2';
                    break;
                default:
                    imageSrc = './Images/mist.png';
                    bgColor = '#66e3e2';
            }
            image.src = imageSrc;
            myWeatherContainer.style.backgroundColor = bgColor;

            // Updating dates
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            dates.innerHTML = `${date.getDate()}, ${months[date.getMonth()]}`;
        } else {
            myCity.innerHTML = 'City not found';
            weather.innerHTML = '';
            temp.innerHTML = '';
            image.src = './Images/no-work.png';
            myWeatherContainer.style.backgroundColor = '#66e3e2';
        }
    }).catch((error) => {
        console.error('Error fetching weather data:', error);
        myCity.innerHTML = 'Error fetching data';
    });
});

