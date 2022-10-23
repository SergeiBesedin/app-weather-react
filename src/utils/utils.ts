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

export function tempFormat(temp: number, tempUnit: string): string {
    let t: number
    const symbols: { [key: string]: string } = { fahrenheit: '℉', celsius: '°' }
    switch (tempUnit) {
        case 'fahrenheit':
            t = Math.round(temp * (9 / 5) + 32)
            break
        case 'celsius':
            t = Math.round((temp - 32) * (5 / 9))
            break
        default:
            t = Math.round(temp)
            break
    }
    return `${t} ${symbols[tempUnit]}`
}
