import { useState, useEffect } from 'react';
import axios from 'axios';
import Widget from './Widget';
import Error from './Error';

function App() {
  // Stats
  const limit = 1;
  const apikey = process.env.REACT_APP_API_KEY;
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // App States
  const [search, setSearch] = useState('');

  // Widget States
  const [data, setData] = useState(null);
  const [city, setCity] = useState(null);

  // Handling loading
  useEffect(() => {
    if(error !== null || data !== null)
      setIsLoading(false); 
    else 
      setIsLoading(true);
  }, [error, data]);

  // Clearing states
  const clearStats = () => {
    setError(null);
    setData(null);
    setCity(null)
  }

  // Handling autodetect geolocation
  if (navigator.geolocation) 
    navigator.geolocation.getCurrentPosition(handleAutoDetect, () => alert("Unable to retrieve your location"));
  else
    alert("Geolocation not permissioned");
  
  function handleAutoDetect(position) {
    clearStats();

    const { latitude, longitude }  = position.coords;
    
    const [res, err] = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric&lang=pl`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
    
    if(err) return setError(err.message);
    else return setData(res.data);
  }

  // Handling searching
  const handleSearch = async (e) => {
    e.preventDefault();
    clearStats();

    const [geo, error] = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${limit}&appid=${apikey}`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);

    if(error) return setError(error.message);
    else if(geo.data.length === 0) return setError('Brak wyników');
    else return setCity(geo.data[0].name)
    
    const { lat, lon } = geo.data[0];
    const [res, err] = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=pl`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
    
    if(err) return setError(err.message);
    else return setData(res.data);
  }

  return (
    <div className='min-h-screen bg-slate-200'>
      <div>
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <p>Loading..</p>}
      {error && <Error error={error} />}
      {data && <Widget city={city} data={data}/>}
    </div>
  );
}

export default App;
