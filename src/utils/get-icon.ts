// Большие иконки для карточки с текущей погодой
import clear from '../assets/icons/main-images/clear.svg'
import clouds from '../assets/icons/main-images/clouds.svg'
import partlyCloudy from '../assets/icons/main-images/partly-cloudy.svg'
import rain from '../assets/icons/main-images/rain.svg'
import snow from '../assets/icons/main-images/snow.svg'
import thunder from '../assets/icons/main-images/thunder.svg'
import fog from '../assets/icons/main-images/fog.svg'
import drizzle from '../assets/icons/main-images/drizzle.svg'
// Маленькие иконки
import clearmini from '../assets/icons/mini-images/clear.svg'
import cloudsmini from '../assets/icons/mini-images/clouds.svg'
import partlycloudymini from '../assets/icons/mini-images/partly-cloudy.svg'
import rainmini from '../assets/icons/mini-images/rain.svg'
import snowmini from '../assets/icons/mini-images/snow.svg'
// Иконки для блока с прогнозом на завтра
import cleartomorrow from '../assets/icons/forecast-tomorrow/clear.svg'
import raintomorrow from '../assets/icons/forecast-tomorrow/rain.svg'
import snowtomorrow from '../assets/icons/forecast-tomorrow/snow.svg'
import rainAndSnowtomorrow from '../assets/icons/forecast-tomorrow/rain-and-snow.svg'
// Иконки для блока с рекомендуемой одеждой
import thermometer from '../assets/icons/thermometer.svg'

export function getIcon(weather: string) {
    const icons: { [key: string]: string } = {
        clouds,
        rain,
        snow,
        thunder,
        clear,
        fog,
        drizzle,
        // 'partly-сloudy': partlyCloudy,

        clearmini,
        cloudsmini,
        // partlycloudymini,
        rainmini,
        snowmini,

        cleartomorrow,
        raintomorrow,
        snowtomorrow,
        rainAndSnowtomorrow,

        thermometer,
    }
    return icons[weather.toLowerCase()]
}
