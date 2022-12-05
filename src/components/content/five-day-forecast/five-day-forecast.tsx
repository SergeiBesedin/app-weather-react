import { Tile } from '../tile/tile'
import { IWeather } from '../../../typings/typings'
import { FiveDayForecastItem } from './five-day-forecast-item/five-day-forecast-item'
import styles from './five-day-forecast.module.scss'

interface FiveDayForecastProps {
    items: Array<IWeather>
    tempUnit: string
}

export function FiveDayForecast({ items, tempUnit }: FiveDayForecastProps) {
    const title = 'Прогноз на 5 дней'

    const filteredItems = items.filter((item) => item.dt_txt!.includes('12:00:00'))

    return (
        <Tile title={title} classes={[styles.fiveDayForecast]}>
            <ul>
                {filteredItems.map((item) => (
                    <FiveDayForecastItem
                        key={item.dt}
                        timestamp={item.dt}
                        weather={item.weather[0].main}
                        tempMin={item.main.temp_min}
                        tempMax={item.main.temp_max}
                        tempUnit={tempUnit}
                    />
                ))}
            </ul>
        </Tile>
    )
}
