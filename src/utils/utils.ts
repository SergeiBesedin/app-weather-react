import DateTimeFormatOptions = Intl.DateTimeFormatOptions

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
export function unitFormat(value: number, unit: string): string {
    let result: number
    const symbols: { [key: string]: string } = {
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
    // при необходимости функцию можно расширить, добавив дополнительные единицы измерения
    switch (unit) {
        // температура
        case 'fahrenheit':
            result = Math.round(value * (9 / 5) + 32)
            break
        case 'celsius':
            result = Math.round(value) // получаем по умолчанию
            break

        // скорость
        case 'kh':
            result = Math.round(value * 3.6)
            break
        case 'ms':
            result = Math.round(value) // получаем по умолчанию
            break

        // давление
        case 'mm':
            result = Math.round(value / 1.333)
            break
        case 'hpa':
            result = Math.round(value) // получаем по умолчанию
            break

        default:
            result = Math.round(value)
            break
    }

    return unit === 'fahrenheit' || unit === 'celsius'
        ? `${result}${symbols[unit]}`
        : `${result} ${symbols[unit]}`
}

// в отличие от unitFormat возвращает только число
export function tempUnitFormat(value: number, unit: string): number {
    switch (unit) {
        case 'fahrenheit':
            return Math.round(value * (9 / 5) + 32)
        case 'celsius':
            return Math.round(value) // получаем по умолчанию
        default:
            return Math.round(value)
    }
}
