import { IWeather } from '../typings/typings'
import { dateFormat, unitFormat } from './utils'

const enum typeOfPrecipitation {
    rain = 'дождь',
    snow = 'снег',
}

type Message = {
    type: string
    message: string
}

export function generateRecommendedClothingMessage(
    feelsLikeTemp: number,
    tempUnit: string,
): Message {
    const temperature = unitFormat(feelsLikeTemp, tempUnit)
    const roundedTemp = Math.round(feelsLikeTemp)

    const message = [`Ощущается как ${temperature}.`]

    let recommendedClothing = ''

    if (tempUnit === 'celsius') {
        if (roundedTemp >= 20) {
            recommendedClothing = 'футболка, шорты и кепка'
        } else if (roundedTemp < 20 && roundedTemp >= 15) {
            recommendedClothing = 'жакет или джинсовка'
        } else if (roundedTemp < 15 && roundedTemp >= 10) {
            recommendedClothing = 'ветровка и теплая кофта'
        } else if (roundedTemp < 10 && roundedTemp >= 0) {
            recommendedClothing = 'головной убор, пальто и свитер'
        } else if (roundedTemp < 0 && roundedTemp >= -25) {
            recommendedClothing = 'шапка, шарф и зимняя куртка'
        } else {
            recommendedClothing = 'шапка, шарф, шерстяные носки и зимняя куртка'
        }
    }

    if (tempUnit === 'fahrenheit') {
        if (roundedTemp >= 68) {
            recommendedClothing = 'футболка, шорты и кепка'
        } else if (roundedTemp < 68 && roundedTemp >= 59) {
            recommendedClothing = 'жакет или джинсовка'
        } else if (roundedTemp < 59 && roundedTemp >= 50) {
            recommendedClothing = 'ветровка и теплая кофта'
        } else if (roundedTemp < 50 && roundedTemp >= 32) {
            recommendedClothing = 'головной убор, пальто и свитер'
        } else if (roundedTemp < 32 && roundedTemp >= -13) {
            recommendedClothing = 'шапка, шарф и зимняя куртка'
        } else {
            recommendedClothing = 'шапка, шарф, шерстяные носки и зимняя куртка'
        }
    }

    if (recommendedClothing) {
        message.push(`Лучшая одежда для этой погоды: ${recommendedClothing}.`)
    }

    return { type: 'thermometer', message: message.join(' ') }
}

export function generateForecastTomorrowMessage(
    curTemp: number,
    tempUnit: string,
    list: Array<IWeather>,
): Message {
    const message: Array<string> = []
    let type: string

    const rain = list.filter((el) => el.rain)
    const snow = list.filter((el) => el.snow)

    if (rain.length && snow.length) {
        type = 'rainAndSnow'
    } else if (rain.length) {
        type = 'rain'
    } else if (snow.length) {
        type = 'snow'
    } else {
        type = 'clear'
    }

    tempDifferenceCreate(curTemp, tempUnit, list, message)
    rainOrSnowTimeCreate(typeOfPrecipitation.rain, rain, message)
    rainOrSnowTimeCreate(typeOfPrecipitation.snow, snow, message)

    return { type, message: message.join('; ') }
}

function tempDifferenceCreate(
    curTemp: number,
    tempUnit: string,
    list: Array<IWeather>,
    message: Array<string>,
): void {
    const listItem = list.find((item) => item.dt_txt?.includes('12:00:00')) // находим нужную временную метку
    const tempCurrent =
        tempUnit === 'fahrenheit' ? Math.round(curTemp * (9 / 5) + 32) : Math.round(curTemp)
    const tempTomorrow =
        tempUnit === 'fahrenheit'
            ? Math.round(listItem!.main.temp * (9 / 5) + 32)
            : Math.round(listItem!.main.temp)

    const difference = Math.abs(tempCurrent - tempTomorrow) // получаем разницу в температуре

    if (tempCurrent > tempTomorrow) {
        message.push(`Завтра ${tempTomorrow}°, на ${difference}° холоднее, чем сегодня`)
    } else if (tempCurrent === tempTomorrow) {
        message.push('Завтра будет такая же температура, как и сегодня')
    } else {
        message.push(`Завтра ${tempTomorrow}°, на ${difference}° теплее, чем сегодня`)
    }
}

function rainOrSnowTimeCreate(type: string, list: Array<IWeather>, message: Array<string>): void {
    if (!list.length) return

    if (list.length >= 3) {
        message.push(`ожидается ${type} почти весь день`)
    } else if (list.length === 2) {
        message.push(
            `ожидается ${type} в ${getTimeInHours(list[0].dt)} и в ${getTimeInHours(list[1].dt)}`,
        )
    } else if (list.length === 1) {
        message.push(`ожидается ${type} в ${getTimeInHours(list[0].dt)}`)
    }
}

function getTimeInHours(dt: number): string {
    return dateFormat(dt * 1000, {
        hour: '2-digit',
        minute: '2-digit',
    })
}
