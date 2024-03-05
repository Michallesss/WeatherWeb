import { useState } from 'react';
import axios from 'axios';
import Widget from './Widget';
import Error from './Error';

function App() {
  const limit = 1;
  const apikey = 'bbb384ea90180777bcc406a7ab401bf9';
  const [search, setSearch] = useState('');
  
  // Stats
  const [error, setError] = useState(() => null);
  const [data, setData] = useState(() => null);
  const [city, setCity] = useState(() => '');

  const handleSearch = async (e) => {
    e.preventDefault();

    const [geo, error] = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=${limit}&appid=${apikey}`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);

    if(error) return setError(error.message);
    if(geo.data.length === 0) return setError('Brak wyników');
    else setCity(geo.data[0].name)
    
    const { lat, lon } = geo.data[0];
    const [res, err] = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric&lang=pl`)
    .then((res) => [res, null])
    .catch((err) => [null, err]);
    
    if(err) return setError(err.message);
    else setData(res.data);
  }

  return (
    <div className='min-h-screen bg-slate-200'>
      <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" />
      <button onClick={handleSearch}>Search</button>
      {error && <Error error={error} />}
      {data && <Widget city={city} time={new Date()} data={data}/>}
    </div>
  );
}

export default App;
