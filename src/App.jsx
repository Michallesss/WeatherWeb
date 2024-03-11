import "./index.css"
import { useState/*, useEffect*/ } from 'react';
import axios from 'axios';
import Widget from './Widget';
import Error from './Error';

function App() {
  // Stats
  const limit = 1;
  const apikey = process.env.REACT_APP_API_KEY;
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

  // App States
  const [search, setSearch] = useState('');

  // Widget States
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);

  // Handling loading
  // useEffect(() => {
  //   if(error !== null || data !== null)
  //     setIsLoading(false); 
  //   else 
  //     setIsLoading(true);
  // }, [error, data]);

  // Clearing states
  const clearStats = () => {
    setError(null);
    setData(null);
    setCity(null)
  }

  // Handling autodetect geolocation
  // if (navigator.geolocation) 
  //   navigator.geolocation.getCurrentPosition(async (position) => {
  //   clearStats();

  //   const { latitude, longitude }  = position.coords;
    
  //   const [res, err] = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric&lang=pl`)
  //   .then((res) => [res, null])
  //   .catch((err) => [null, err]);
    
  //   // if(err) return setError(err.message);
  //   return setData(res.data);
  // }, () => alert("Unable to retrieve your location"));
  // else
  //   alert("Geolocation not permissioned");

  // Handling searching
  const handleSearch = async (e) => {
    e.preventDefault();
    clearStats();

    const [geo, error] = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${limit}&appid=${apikey}`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);

    if(error) return setError(error.message);
    else if(geo.data.length === 0) return setError('Brak wyników');
    else setCity(geo.data[0].name)
    
    const { lat, lon } = geo.data[0];
    const [res, err] = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=pl`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
    
    if(err) return setError(err.message);
    else return setData(res.data);
  }

  return (
    <div className='min-h-screen bg-slate-200'>
      <form class="max-w-md mx-auto">   
        <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input type="search" id="default-search" value={search} onChange={(e) => setSearch(e.target.value)} class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
            <button type="submit" onClick={handleSearch} class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
        </div>
      </form>
      {error && <Error error={error} />}
      {data && <Widget city={city} data={data}/>}
    </div>
  );
}

export default App;
