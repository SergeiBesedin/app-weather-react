import DateTimeFormatOptions = Intl.DateTimeFormatOptions

export function dateFormat(date: number | string | Date, params?: DateTimeFormatOptions) {
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
