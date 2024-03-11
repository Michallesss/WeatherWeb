import "./index.css"

export default function Widget({ data, city }) {
  return (
    <div class="flex items-center justify-center">
      <div class="flex flex-col bg-white rounded p-4 w-full max-w-xs">
        <div class="font-bold text-xl">{city}</div>
        <div class="text-sm text-gray-500">{new Date().toLocaleDateString('pl-PL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        <div class="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
          <img className="w-32 h-32" src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather icon" />
        </div>
        <div class="flex flex-row items-center justify-center mt-6">
          <div class="font-medium text-6xl">{Math.floor(data.main.temp)}°C</div>
          <div class="flex flex-col items-center ml-6">
            <div>{data.weather[0].description}</div>
            <div class="mt-1">
              <span class="text-sm"><i class="far fa-long-arrow-up"></i></span>
              <span class="text-sm font-light text-gray-500">min: {data.main.temp_min}°C</span>
            </div>
            <div>
              <span class="text-sm"><i class="far fa-long-arrow-down"></i></span>
              <span class="text-sm font-light text-gray-500">max: {data.main.temp_min}°C</span>
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-between mt-6">
          <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Wind</div>
            <div class="text-sm text-gray-500">{data.wind.speed}k/h</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Humidity</div>
            <div class="text-sm text-gray-500">{data.main.humidity}%</div>
          </div>
          <div class="flex flex-col items-center">
            <div class="font-medium text-sm">Visibility</div>
            <div class="text-sm text-gray-500">{(data.visibility)/1000}km</div>
          </div>
        </div>
      </div>
    </div>
  );
}