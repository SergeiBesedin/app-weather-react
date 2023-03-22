export type Temp = {
    temp: number // температура (единица по умолчанию: Кельвин)
    temp_max: number // максимальная температура на данный момент
    temp_min: number // минимальная температура на данный момент
    feels_like: number // ощущается как
    humidity: number // влажность (в %)
    pressure: number // атмосферное давление
}

export type Wind = {
    speed: number // скорость ветра (единица измерения по умолчанию: метр/сек)
    gust: number // порывы ветра (единица измерения по умолчанию: метр/сек)
    deg: number // направление ветра, градусы (метеорологические)
}

export type Weather = {
    id: number
    main: string // дождь, снег и тд
    description: string // пасмурно, солнечно
}

export type Sys = {
    id: number
    sunrise: number // время восхода солнца (unix)
    sunset: number // время заката (unix)
}

export interface ICurrentWeatherResponse {
    id: number
    name: string // название города
    dt: number // время расчета данных (timestamp)
    dt_txt: string // время расчета данных (UTC)
    visibility: number // видимость, метр. Максимальное значение видимости = 10км
    main: Temp
    sys: Sys
    timezone: number
    wind: Wind
    weather: Array<Weather>
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

// плитка с погодой на текущий день
export interface ICurrentWeather {
    id: number
    city: string
    weatherName: string
    weatherDesc: string
    temp: Temp
    wind: number
    dateTime: number
    sunrise: number
    sunset: number
    timezone: number
}

// плитка с погодой в других городах (Москва, Новосибирск, Владивосток)
export interface IWeatherInOtherCities {
    id: number
    city: string
    weatherName: string
    tempMax: number
    tempMin: number
}

export type Option = {
    optionValueId: string
    optionValue: string
    unit: string
}

export interface HintsResponse {
    value: string
    unrestricted_value: string
    data: {
        country: string
        country_iso_code: string
        city: string
        city_with_type: string
        city_fias_id: string
    }
}
