const container= document.querySelector('.container')
const search= document.querySelector('.searchBox button')
const weatherBox= document.querySelector('.weatherBox')
const weatherDetails= document.querySelector('.weatherDetails')
const error404= document.querySelector('.notFound')

search.addEventListener('click',()=> {
    const APIKey= "d107d6d572db7cd18eacfdc94020060e";
    const city= document.querySelector('.searchBox input').value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json=> {
            if(json.cod==='404'){
                container.style.height='400px';
                weatherBox.style.display= 'none';
                weatherDetails.style.display= 'none';
                error404.style.display= 'block';
                error404.classList.add('fadeIn');
                return;
            }
                error404.style.display= 'none';
                error404.classList.remove('fadeIn');

                const image= document.querySelector('.weatherBox img');
                const temperature= document.querySelector('.weatherBox .temperature');
                const description= document.querySelector('.weatherBox .description');
                const humidity= document.querySelector('.weatherDetails .humidity span');
                const wind= document.querySelector('.weatherDetails .wind span');


                switch(json.weather[0].main){
                    case 'Clear':
                        image.src='../public/img/clear.png';
                        break;
                    case 'Rain':
                        image.src='../public/img/rain.png';
                        break;
                    case 'Snow':
                        image.src='../public/img/snow.png';
                        break;
                    case 'Clouds':
                        image.src='../public/img/cloud.png';
                        break;
                    case 'Haze':
                        image.src='../public/img/mist.png';
                        break;
                        
                    default:
                        image.src= '';

                }
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

        });
});