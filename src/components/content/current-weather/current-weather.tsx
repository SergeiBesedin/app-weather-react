import { Tile } from '../tile/tile'
import { ICurrentWeather } from '../../../typings/typings'
import styles from './currentWeather.module.scss'

export function CurrentWeather({ city, weather, temp, wind }: ICurrentWeather) {
    return (
        <Tile title='Сегодня' classes={[styles.tileContainer]}>
            <div>{city}</div>
            <div>{temp.temp}</div>
            <div>{weather}</div>
            <div>
                <span>{temp.humidity}</span>
                <span>{wind}</span>
                <span>{temp.pressure}</span>
            </div>
        </Tile>
    )
}
