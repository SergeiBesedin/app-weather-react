import clear from '../assets/icons/clear.svg'
import cloudy from '../assets/icons/cloudy.svg'
import partlyCloudy from '../assets/icons/partly-cloudy.svg'
import rain from '../assets/icons/rain.svg'
import snow from '../assets/icons/snow.svg'
import thunder from '../assets/icons/thunder.svg'

export function getIcon(weather: string) {
    const icons: { [key: string]: string } = {
        clouds: cloudy,
        rain,
        snow,
        thunder,
        clear,
        'partly-сloudy': partlyCloudy,
    }
    return icons[weather.toLowerCase()]
}
