import DateTimeFormatOptions = Intl.DateTimeFormatOptions

export function dateFormat(date: number | string | Date, params?: DateTimeFormatOptions): string {
    const options: DateTimeFormatOptions = params
        ? params
        : {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          }
    return new Intl.DateTimeFormat('ru', options).format(new Date(date))
}

// функция изменения единицы измерения
export function unitFormat(value: number, unit: string): string {
    let result: number
    const symbols: { [key: string]: string } = {
        // температура
        fahrenheit: '℉',
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
    return `${result} ${symbols[unit]}`
}
