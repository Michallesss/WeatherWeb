import axios from 'axios';

const LIMIT = 1;
const API_KEY = process.env.REACT_APP_API_KEY;
const instance = axios.create({
    baseUrl: 'http://api.openweathermap.org/geo/1.0/direct',
    timeout: 1000,
});

export default async function useGeo(name) {
    return await axios.get(`?q=${name}&limit=${LIMIT}&appid=${API_KEY}`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
}