import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
const instance = axios.create({
    baseUrl: 'https://api.openweathermap.org/data/2.5/weather',
    timeout: 1000,
});

export default async function useWeather(lat, lon) {
    return await instance.get(`?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=pl`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
}