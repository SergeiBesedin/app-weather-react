import { useRef } from 'react'
import { IWeather } from './../../../typings/typings'
import { Tile } from '../tile/tile'
import { Button } from '../../ui/button/button'
import { HourlyForecastItem } from './hourly-forecast-item/hourly-forecast-item'
import styles from './hourly-forecast.module.scss'

const UNIX_TIME_DAY = 86400 // день, переведенный в unix
interface HourlyForecastProps {
    items: Array<IWeather>
    tempUnit: string
}

export function HourlyForecast({ items, tempUnit }: HourlyForecastProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)
    const listItemsRef = useRef<HTMLUListElement>(null)

    const filteredItems = items.filter((item) => item.dt <= items[0].dt + UNIX_TIME_DAY) // показываем в карусели только 9 временных меток

    const title = 'Почасовой прогноз'

    const arrowClickHandler = (toLeft: boolean) => {
        const containerWidth = wrapperRef.current?.getBoundingClientRect().width
        if (!containerWidth) return
        const shift = (toLeft ? -1 : 1) * (containerWidth - 50)
        listItemsRef.current?.scrollBy({
            left: shift,
            behavior: 'smooth',
        })
    }

    return (
        <Tile title={title} classes={[styles.tileContainer]}>
            <div className={styles.wrapper} ref={wrapperRef}>
                <Button
                    classes={[styles.leftArrow]}
                    disabled={false}
                    onClick={() => arrowClickHandler(true)}
                />
                <ul className={styles.listItems} ref={listItemsRef}>
                    {filteredItems.map((item) => (
                        <HourlyForecastItem
                            key={item.dt}
                            timestamp={item.dt}
                            weather={item.weather[0].main}
                            temp={item.main.temp}
                            tempUnit={tempUnit}
                        />
                    ))}
                </ul>
                <Button
                    classes={[styles.rightArrow]}
                    disabled={false}
                    onClick={() => arrowClickHandler(false)}
                />
            </div>
        </Tile>
    )
}
