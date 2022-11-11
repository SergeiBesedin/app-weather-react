import { useRef } from 'react'
import { IWeather } from './../../../typings/typings'
import { dateFormat } from '../../../utils/utils'
import { Tile } from '../tile/tile'
import { Button } from '../../ui/button/button'
import { HourlyForecastItem } from './hourly-forecast-item/hourly-forecast-item'
import styles from './hourly-forecast.module.scss'

const TIMESTAMPS = 8 // Количество временных меток за один день, т.к. 24 / 3 = 8
interface HourlyForecastProps {
    items: Array<IWeather>
    tempUnit: string
}

export function HourlyForecast({ items, tempUnit }: HourlyForecastProps) {
    const listItemsRect = useRef(null)

    const title = 'Почасовой прогноз'

    const currentDayTimestamps =
        TIMESTAMPS + 1 - Number(dateFormat(items[0].dt * 1000, { hour: 'numeric' })) / 3 // считаем сколько меток осталось в текущем дне
    // Показываем оставшиеся метки за текущий день + все метки следующего дня
    const filteredItems = items.slice(0, currentDayTimestamps + TIMESTAMPS)

    const arrowClickHandler = (toLeft: boolean) => {
        // let shift = (toLeft ? -1 : 1) * (nodesRect.width - this.nodeWidth)
        // this.view.nodes.scrollBy({
        //     left: shift,
        //     behavior: 'smooth',
        // })
    }

    return (
        <Tile title={title} classes={[styles.tileContainer]}>
            <div className={styles.wrapper} ref={listItemsRect}>
                <Button
                    classes={[styles.leftArrow]}
                    disabled={false}
                    onClick={() => arrowClickHandler(true)}
                />
                <ul className={styles.listItems}>
                    {filteredItems.map((item) => {
                        return (
                            <HourlyForecastItem
                                key={item.dt}
                                timestamp={item.dt}
                                weather={item.weather[0].main}
                                temp={item.main.temp}
                                tempUnit={tempUnit}
                            />
                        )
                    })}
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
