import { memo } from 'react'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { IWeather } from '../../../../typings/typings'
import { Item } from './item/item'
import styles from './five-day-forecast.module.scss'

interface FiveDayForecastProps {
    items: Array<IWeather>
    tempUnit: string
}

function FiveDayForecast({ items, tempUnit }: FiveDayForecastProps) {
    const title = 'Прогноз на 5 дней'

    const filteredItems = items.filter((item) => item.dt_txt.includes('12:00:00'))

    const classNames = [styles.fiveDayForecast]

    if (!filteredItems.length) {
        classNames.push('hide')
    }

    return (
        <TileWrapper title={title} classes={classNames}>
            <ul>
                {filteredItems.map((item) => (
                    <Item
                        key={item.dt}
                        timestamp={item.dt}
                        weather={item.weather[0].main}
                        tempMin={item.main.temp_min}
                        tempMax={item.main.temp_max}
                        tempUnit={tempUnit}
                    />
                ))}
            </ul>
        </TileWrapper>
    )
}

export default memo(FiveDayForecast)
