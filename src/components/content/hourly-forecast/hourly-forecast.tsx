import { useRef } from 'react'
import { useCarouselScrolling } from '../../../hooks/carousel-scrolling'
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
    const wrapperRef = useRef<HTMLDivElement>(null)
    const listItemsRef = useRef<HTMLUListElement>(null)
    const { leftBtn, rightBtn, buttonClickHandler, showOrHideButtons } = useCarouselScrolling()

    const ITEM_WIDTH = 60
    const UNIX_TIME_DAY = 86400 // день, переведенный в unix
    const title = 'Почасовой прогноз'

    const filteredItems = items.filter((item) => item.dt <= items[0].dt + UNIX_TIME_DAY) // показываем в карусели только 9 временных меток

    return (
        <Tile title={title} classes={[styles.tileContainer]}>
            <div className={styles.wrapper} ref={wrapperRef}>
                <Button
                    aria-label='Прокрутить назад'
                    classes={[styles.leftArrow]}
                    disabled={leftBtn}
                    onClick={() =>
                        buttonClickHandler(
                            wrapperRef.current,
                            listItemsRef.current,
                            ITEM_WIDTH,
                            true,
                        )
                    }
                />
                <ul
                    className={styles.listItems}
                    ref={listItemsRef}
                    onScroll={() => showOrHideButtons(listItemsRef.current)}
                >
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
                    aria-label='Прокрутить вперед'
                    classes={[styles.rightArrow]}
                    disabled={rightBtn}
                    onClick={() =>
                        buttonClickHandler(
                            wrapperRef.current,
                            listItemsRef.current,
                            ITEM_WIDTH,
                            false,
                        )
                    }
                />
            </div>
        </Tile>
    )
}
