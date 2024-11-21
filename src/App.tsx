import { useState } from 'react'

interface WeatherData {
  name: string
  main: {
    temp: number
  }
  weather: Array<{
    description: string
  }>
}

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [city, setCity] = useState<string>('Tashkent')
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cefc0aec68db54e26a5e72ec4f586f5d&units=metric`
      )

      if (!response.ok) {
        throw new Error('Xato: Havo ma\'lumotlarini olishda muammo yuz berdi.')
      }

      const data: WeatherData = await response.json()
      setWeather(data)
      setError(null)
    } catch (err: any) {
      setWeather(null)
      setError(err.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-300 text-white p-4">
      <h1 className="text-4xl font-bold mb-6 drop-shadow-md shadow-black">Havo Ma'lumotlari</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Shahar nomini kiriting"
        className="border border-gray-300 rounded-lg p-3 mb-4 w-80 focus:outline-none focus:ring-4 focus:ring-blue-700 text-gray-800"
      />
      <button
        onClick={fetchWeather}
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg mb-6 shadow-lg transition duration-300"
      >
        Havo Ma'lumotlarini Olish
      </button>
      {error && (
        <p className="text-red-200 bg-red-700 bg-opacity-70 px-4 py-2 rounded-lg mb-4 text-center">
          {error}
        </p>
      )}
      {weather && (
        <div className="bg-white bg-opacity-90 shadow-lg rounded-lg p-6 w-80 text-gray-800">
          <h2 className="text-2xl font-bold mb-2">{weather.name}</h2>
          <p className="text-xl mb-1">
            Harorat: <span className="font-semibold">{weather.main.temp} °C</span>
          </p>
          <p className="text-lg italic">Havo: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}

export default App
