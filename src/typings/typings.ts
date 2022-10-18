type Temp = {
    temp: number // температура (единица по умолчанию: Кельвин)
    temp_max: number // максимальная температура на данный момент
    temp_min: number // минимальная температура на данный момент
    feels_like: number // ощущается как
    humidity: number // влажность (в %)
    pressure: number // атмосферное давление
}

type Wind = {
    speed: number // скорость ветра (единица измерения по умолчанию: метр/сек)
    gust: number // порывы ветра (единица измерения по умолчанию: метр/сек)
    deg: number // направление ветра, градусы (метеорологические)
}

type Weather = {
    id: number
    main: string // дождь, снег и тд
    description: string // пасмурно, солнечно
}

type Sys = {
    id: number
    sunrise: number // время восхода солнца (unix)
    sunset: number // время заката (unix)
}

export interface IWeather {
    name: string // название города
    visibility: number // видимость, метр. Максимальное значение видимости = 10км
    main: Temp
    sys: Sys
    wind: Wind
    weather: Weather
    clouds: {
        all: number // Облачность (в %)
    }
    rain: {
        '1h': number // объем осадков за последний час
        '3h': number // объем осадков за последние 3 часа
    }
    snow: {
        '1h': number
        '3h': number
    }
}
