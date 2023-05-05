import { memo } from 'react'
import { IWeatherInOtherCities } from 'typings'
import { TemperatureUnits } from '../../../../utils/utils'
import { TileWrapper } from '../tile-wrapper/tile-wrapper'
import { Item } from './item/item'
import styles from './weather-in-cities.module.scss'

interface WeatherInCitiesProps {
    cities: Array<IWeatherInOtherCities>
    tempUnit: TemperatureUnits
}

function WeatherInCities({ cities, tempUnit }: WeatherInCitiesProps) {
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

export default memo(WeatherInCities)
