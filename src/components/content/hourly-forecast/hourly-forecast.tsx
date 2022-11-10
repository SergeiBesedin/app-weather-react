import { IWeather } from './../../../typings/typings'
import { Tile } from '../tile/tile'
import { Button } from '../../ui/button/button'
import { HourlyForecastItem } from './hourly-forecast-item/hourly-forecast-item'
import styles from './hourly-forecast.module.scss'

interface HourlyForecastProps {
    items: Array<IWeather>
    tempUnit: string
}

export function HourlyForecast({ items, tempUnit }: HourlyForecastProps) {
    // TODO Заменить ключи
    const title = 'Почасовой прогноз'

    const click = () => {
        console.log('click')
    }

    return (
        <Tile title={title} classes={[styles.tileContainer]}>
            <div className={styles.wrapper}>
                <Button classes={[styles.leftArrow]} disabled={false} onClick={click} />
                <ul className={styles.listItems}>
                    {items.map((item, ind) => {
                        return (
                            <HourlyForecastItem
                                key={ind}
                                timestamp={item.dt}
                                weather={item.weather[0].main}
                                temp={item.main.temp}
                                tempUnit={tempUnit}
                            />
                        )
                    })}
                </ul>
                <Button classes={[styles.rightArrow]} disabled={false} onClick={click} />
            </div>
        </Tile>
    )
}
