import { ICurrentWeather } from '../../../../typings/typings'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { Item } from './item/item'
import styles from './weather-in-cities.module.scss'

interface WeatherInCitiesProps {
    cities: Array<ICurrentWeather>
    tempUnit: string
}

export function WeatherInCities({ cities, tempUnit }: WeatherInCitiesProps) {
    return (
        <TileWrapper classes={[styles.weatherInCities]}>
            <ul className={styles.list}>
                {cities.map((city) => (
                    <Item
                        key={city.id}
                        city={city.city}
                        tempMax={city.temp.temp_max}
                        tempMin={city.temp.temp_min}
                        weather={city.weatherName}
                        tempUnit={tempUnit}
                    />
                ))}
            </ul>
        </TileWrapper>
    )
}
