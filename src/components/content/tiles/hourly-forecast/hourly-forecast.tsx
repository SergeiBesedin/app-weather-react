import { memo, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useCarouselScrolling } from '../../../../hooks/use-carousel-scrolling'
import { IWeather } from '../../../../typings/typings'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { Button } from '../../../ui/index'
import { Item } from './item/item'
import styles from './hourly-forecast.module.scss'

interface HourlyForecastProps {
    items: Array<IWeather>
    tempUnit: string
}

function HourlyForecast({ items, tempUnit }: HourlyForecastProps) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const listItemsRef = useRef<HTMLUListElement>(null)

    const { leftBtn, rightBtn, buttonClickHandler, showOrHideButtons } = useCarouselScrolling()

    const debouncedCarouselScrolling = useDebouncedCallback(
        () => showOrHideButtons(listItemsRef.current),
        300,
    )

    const ITEM_WIDTH = 60
    const UNIX_TIME_DAY = 86400 // день, переведенный в unix
    const title = 'Почасовой прогноз'

    const filteredItems = items.filter((item) => item.dt <= items[0].dt + UNIX_TIME_DAY) // показываем в карусели только 9 временных меток

    const classNames = [styles.hourlyForecast]

    if (!filteredItems.length) {
        classNames.push('hide')
    }

    return (
        <TileWrapper title={title} classes={classNames}>
            <div className={styles.wrapper} ref={wrapperRef}>
                <Button
                    type={'button'}
                    aria-label="Прокрутить назад"
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
                    onScroll={debouncedCarouselScrolling}
                >
                    {filteredItems.map((item) => (
                        <Item
                            key={item.dt}
                            timestamp={item.dt}
                            weather={item.weather[0].main}
                            temp={item.main.temp}
                            tempUnit={tempUnit}
                        />
                    ))}
                </ul>
                <Button
                    type={'button'}
                    aria-label="Прокрутить вперед"
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
        </TileWrapper>
    )
}

export default memo(HourlyForecast)
