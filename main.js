function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

export function getWeather(city) {
    console.log("asdasd");
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(`https://www.meteosource.com/api/v1/free/point?place_id=${city}&sections=current&timezone=auto&language=en&units=metric&key=kj76d80ni8zt4zjwayeib45l518nggtl2jdgpmkw`)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const tempText = document.getElementById('temp');
        const parsedData = JSON.parse(data.contents);
        console.log(parsedData);
        if (!parsedData.current) {
            tempText.innerText = "city not found";
            throw new Error('City not found');
        }
        let temperature = parsedData.current.temperature;
        let summary = parsedData.current.summary;
        if(temperature < 0) {
            tempText.style.color = 'blue';
        } else if(temperature > 15) {
            tempText.style.color = 'red';
        }
        else {
            tempText.style.color = 'black';
        }
        tempText.innerText = `Current weather in ${city}: ${temperature}°C, ${summary}.`;
    })
    .catch(error => console.error('There has been a problem:', error));
    
}
const throttledGetWeather = throttle(getWeather, 60000);
window.getWeather = throttledGetWeather;