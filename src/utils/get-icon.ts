// Большие иконки для карточки с текущей погодой
import clear from '../assets/icons/main-images/clear.svg'
import clouds from '../assets/icons/main-images/clouds.svg'
// import partlyCloudy from '../assets/icons/main-images/partly-cloudy.svg'
import rain from '../assets/icons/main-images/rain.svg'
import snow from '../assets/icons/main-images/snow.svg'
import thunder from '../assets/icons/main-images/thunder.svg'
import mist from '../assets/icons/main-images/mist.svg'
import drizzle from '../assets/icons/main-images/drizzle.svg'
// Маленькие иконки
import clearMini from '../assets/icons/mini-images/clear.svg'
import cloudsMini from '../assets/icons/mini-images/clouds.svg'
// import partlyCloudyMini from '../assets/icons/mini-images/partly-cloudy.svg'
import rainMini from '../assets/icons/mini-images/rain.svg'
import snowMini from '../assets/icons/mini-images/snow.svg'
import fogMini from '../assets/icons/mini-images/fog.svg'
// Иконки для блока с прогнозом на завтра
import clearTomorrow from '../assets/icons/forecast-tomorrow/clear.svg'
import rainTomorrow from '../assets/icons/forecast-tomorrow/rain.svg'
import snowTomorrow from '../assets/icons/forecast-tomorrow/snow.svg'
import rainAndSnowTomorrow from '../assets/icons/forecast-tomorrow/rain-and-snow.svg'
// Иконки для блока с временем восхода и заката
import sunrise from '../assets/icons/sunrise-sunset/sunrise.svg'
import sunset from '../assets/icons/sunrise-sunset/sunset.svg'
// Иконки для блока с рекомендуемой одеждой
import thermometer from '../assets/icons/thermometer.svg'
// Иконки для ошибок
import emptySearch from '../assets/icons/empty-search-error.svg'
import connectionError from '../assets/icons/connection-error.svg'

export function getIcon(weather: string) {
    const icons: Record<string, string> = {
        clouds,
        rain,
        snow,
        thunder,
        clear,
        mist,
        fog: mist,
        smoke: mist,
        drizzle,
        // 'partly-сloudy': partlyCloudy,

        clearMini,
        cloudsMini,
        // partlyCloudyMini,
        rainMini,
        snowMini,
        fogMini,
        mistMini: fogMini,
        smokeMini: fogMini,

        clearTomorrow,
        rainTomorrow,
        snowTomorrow,
        rainAndSnowTomorrow,

        thermometer,

        emptySearch,
        connectionError,

        sunrise,
        sunset,
    }
    return icons[weather]
}
