export interface IWeatherCard {
  weather: [
    {
      id: number // 800
      main: string // "Clear",
      description: string // "ясно",
      icon: string // "01d"
    }
  ]
  base: string // "stations",
  main: {
    temp: number // 14.03
    feels_like: number // 12.12
    temp_min: number // 13
    temp_max: number // 15
    pressure: number // 1026
    humidity: number // 24
  }
  visibility: number // 10000
  wind: {
    speed: number // 7
    deg: number // 360
    gust: number // 12
  }
  clouds: {
    all: number // 0
  }
  dt: number // 1620640635
  sys: {
    type: number // 1
    id: number // 9027
    country: string // "RU",
    sunrise: number // 1620610048
    sunset: number // 1620667468
  }
  timezone: number // 10800
  id: number // 524901
  name: string // "Москва",
  cod: number // 200
}

export interface IGeoCode {
  name: string // "London",
  local_names: Record<string, string>
  lat: number // 51.5085,
  lon: number // -0.1257,
  country: string // "GB"
  state?: string
}
