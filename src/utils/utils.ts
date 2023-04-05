import DateTimeFormatOptions = Intl.DateTimeFormatOptions

export const enum TemperatureUnits {
    FAHRENHEIT = 'fahrenheit',
    CELSIUS = 'celsius',
}

export const enum SpeedUnits {
    KH = 'kh',
    MS = 'ms',
}

export const enum PressureUnits {
    MM = 'mm',
    HPA = 'hpa',
}

export type AllUnitsType = TemperatureUnits | SpeedUnits | PressureUnits

export function dateFormat(date: number | string | Date, params?: DateTimeFormatOptions): string {
    const options: DateTimeFormatOptions = params
        ? params
        : {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false,
          }
    return new Intl.DateTimeFormat('ru', options).format(new Date(date))
}

export function getLocalTime(time: number, timezone: number): number {
    return (time + timezone - 10800) * 1000
}

export function getTomorrowDate(): string {
    const tomorrow = new Date()

    tomorrow.setDate(tomorrow.getDate() + 1)

    const year = tomorrow.getFullYear()

    const month =
        tomorrow.getMonth() + 1 < 10 ? '0' + (tomorrow.getMonth() + 1) : tomorrow.getMonth() + 1

    const day = tomorrow.getDate() < 10 ? '0' + tomorrow.getDate() : tomorrow.getDate()

    return `${year}-${month}-${day}`
}

// функция, которая делает первую букву в слове заглавной
export function ucFirst(str: string): string {
    return str[0].toUpperCase() + str.slice(1)
}

// функция изменения единиц измерения
export function unitFormat(value: number, unit: AllUnitsType): string {
    const symbols: Record<string, string> = {
        // температура
        fahrenheit: '°',
        celsius: '°',

        // скорость
        ms: 'м/с',
        kh: 'км/ч',

        // давление
        hpa: 'гПа',
        mm: 'мм. рт. ст.',
    }

    let result: number

    // при необходимости функцию можно расширить, добавив дополнительные единицы измерения
    switch (unit) {
        // температура
        case TemperatureUnits.FAHRENHEIT:
            result = Math.round(value * (9 / 5) + 32)
            break
        case TemperatureUnits.CELSIUS:
            result = Math.round(value) // получаем по умолчанию
            break

        // скорость
        case SpeedUnits.KH:
            result = Math.round(value * 3.6)
            break
        case SpeedUnits.MS:
            result = Math.round(value) // получаем по умолчанию
            break

        // давление
        case PressureUnits.MM:
            result = Math.round(value / 1.333)
            break
        case PressureUnits.HPA:
            result = Math.round(value) // получаем по умолчанию
            break

        default:
            result = Math.round(value)
            break
    }

    return unit === TemperatureUnits.FAHRENHEIT || unit === TemperatureUnits.CELSIUS
        ? `${result}${symbols[unit]}`
        : `${result} ${symbols[unit]}`
}

// в отличие от unitFormat возвращает только число
export function tempUnitFormat(value: number, unit: TemperatureUnits): number {
    switch (unit) {
        case TemperatureUnits.FAHRENHEIT:
            return Math.round(value * (9 / 5) + 32)

        case TemperatureUnits.CELSIUS:
            return Math.round(value) // получаем по умолчанию

        default:
            return Math.round(value)
    }
}
