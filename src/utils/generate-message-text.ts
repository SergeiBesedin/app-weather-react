import { ICurrentWeatherResponse } from '../typings/typings'
import { dateFormat, unitFormat, tempUnitFormat, TemperatureUnits } from './utils'

const enum TypeOfPrecipitation {
    RAIN = 'дождь',
    SNOW = 'снег',
}

type Message = {
    icon: string
    message: string
}

export function generateRecommendedClothingMessage(
    feelsLikeTemp: number,
    tempUnit: string,
): Message {
    const temp = unitFormat(feelsLikeTemp, tempUnit)
    const recommendedClothing = getRecommendedClothes(Math.round(feelsLikeTemp), tempUnit)

    const message = `Ощущается как ${temp}. Лучшая одежда для этой погоды: ${recommendedClothing}.`

    return { icon: 'thermometer', message }
}

export function generateForecastTomorrowMessage(
    curTemp: number,
    tempUnit: string,
    list: Array<ICurrentWeatherResponse>,
): Message {
    const message: Array<string> = []
    let icon: string

    const rain = list.filter((el) => el.rain)
    const snow = list.filter((el) => el.snow)

    if (rain.length && snow.length) {
        icon = 'rainAndSnow'
    } else if (rain.length) {
        icon = 'rain'
    } else if (snow.length) {
        icon = 'snow'
    } else {
        icon = 'clear'
    }

    getTempDifference(curTemp, tempUnit, list, message)

    getRainOrSnowTime(TypeOfPrecipitation.RAIN, rain, message)
    getRainOrSnowTime(TypeOfPrecipitation.SNOW, snow, message)

    if (!rain.length && !snow.length) {
        message.push('осадков не ожидается')
    }

    return { icon, message: message.join('; ') }
}

function getTempDifference(
    curTemp: number,
    tempUnit: string,
    list: Array<ICurrentWeatherResponse>,
    message: Array<string>,
): void {
    const listItem = list.find((item) => item.dt_txt?.includes('12:00:00')) // находим нужную временную метку
    const tempCurrent =
        tempUnit === TemperatureUnits.FAHRENHEIT
            ? Math.round(curTemp * (9 / 5) + 32)
            : Math.round(curTemp)
    const tempTomorrow =
        tempUnit === TemperatureUnits.FAHRENHEIT
            ? // eslint-disable-next-line
              Math.round(listItem!.main.temp * (9 / 5) + 32)
            : // eslint-disable-next-line
              Math.round(listItem!.main.temp)

    const difference = Math.abs(tempCurrent - tempTomorrow) // получаем разницу в температуре

    if (tempCurrent > tempTomorrow) {
        message.push(`Завтра ${tempTomorrow}°, на ${difference}° холоднее, чем сегодня`)
    } else if (tempCurrent === tempTomorrow) {
        message.push('Завтра будет такая же температура, как и сегодня')
    } else {
        message.push(`Завтра ${tempTomorrow}°, на ${difference}° теплее, чем сегодня`)
    }
}

function getRainOrSnowTime(
    type: TypeOfPrecipitation,
    list: Array<ICurrentWeatherResponse>,
    message: Array<string>,
): void {
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

function getRecommendedClothes(temp: number, tempUnit: string): string {
    if (temp >= tempUnitFormat(20, tempUnit)) {
        return 'футболка, шорты и кепка'
    } else if (temp < tempUnitFormat(20, tempUnit) && temp >= tempUnitFormat(15, tempUnit)) {
        return 'жакет или джинсовка'
    } else if (temp < tempUnitFormat(15, tempUnit) && temp >= tempUnitFormat(10, tempUnit)) {
        return 'ветровка и теплая кофта'
    } else if (temp < tempUnitFormat(10, tempUnit) && temp >= tempUnitFormat(0, tempUnit)) {
        return 'головной убор, пальто и свитер'
    } else if (temp < tempUnitFormat(0, tempUnit) && temp >= tempUnitFormat(-25, tempUnit)) {
        return 'шапка, шарф и зимняя куртка'
    } else {
        return 'шапка, шарф, шерстяные носки и зимняя куртка'
    }
}
