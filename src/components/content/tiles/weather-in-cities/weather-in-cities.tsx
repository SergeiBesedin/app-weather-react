import { IWeatherInOtherCities } from '../../../../typings/typings'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { Item } from './item/item'
import styles from './weather-in-cities.module.scss'

interface WeatherInCitiesProps {
    cities: Array<IWeatherInOtherCities>
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
                        tempMax={city.tempMax}
                        tempMin={city.tempMin}
                        weather={city.weatherName}
                        tempUnit={tempUnit}
                    />
                ))}
            </ul>
        </TileWrapper>
    )
}
