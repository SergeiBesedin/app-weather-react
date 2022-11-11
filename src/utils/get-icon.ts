// Большие иконки для карточки с текущей погодой
import clear from '../assets/icons/clear.svg'
import clouds from '../assets/icons/clouds.svg'
import partlyCloudy from '../assets/icons/partly-cloudy.svg'
import rain from '../assets/icons/rain.svg'
import snow from '../assets/icons/snow.svg'
import thunder from '../assets/icons/thunder.svg'
// Маленькие иконки
import clearmini from '../assets/icons/clear-mini.svg'
import cloudsmini from '../assets/icons/clouds-mini.svg'
import partlycloudymini from '../assets/icons/partly-cloudy-mini.svg'
import rainmini from '../assets/icons/rain-mini.svg'
import snowmini from '../assets/icons/snow-mini.svg'

export function getIcon(weather: string) {
    const icons: { [key: string]: string } = {
        clouds,
        rain,
        snow,
        thunder,
        clear,
        // 'partly-сloudy': partlyCloudy,

        clearmini,
        cloudsmini,
        // partlycloudymini,
        rainmini,
        snowmini,
    }
    return icons[weather.toLowerCase()]
}
