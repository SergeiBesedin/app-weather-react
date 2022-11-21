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

export interface IWeather {
    name: string // название города
    dt: number // время расчета данных
    visibility: number // видимость, метр. Максимальное значение видимости = 10км
    main: Temp
    sys: Sys
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

// используется в плитке с погодой на текущий день
export interface ICurrentWeather {
    city: string
    weatherName: string
    weatherDesc: string
    temp: Temp
    wind: number
    dateTime: string
}

export interface IFiveDayForecast {
    cnt: number // Количество меток времени, возвращенных в ответе API
    list: Array<IWeather>
}

export type Option = {
    optionValueId: string
    optionValue: string
    unit: string
}

export interface ISettings {
    optionId: string
    optionGroup: string
    unitName: string
    values: Array<Option>
}
