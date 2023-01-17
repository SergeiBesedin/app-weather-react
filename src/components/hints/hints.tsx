import { Hint } from './hint/hint'
import { CityData } from '../../data/hints-data'
import styles from './hints.module.scss'

interface HintsProps {
    cities: Array<CityData>
    clickOnHint: (value: string) => void
}

export function Hints({ cities, clickOnHint }: HintsProps) {
    return (
        <div className={styles.hints}>
            <div className={styles.container}>
                <ul>
                    {cities.map((city) => (
                        <Hint key={city.id} city={city.city} clickOnHint={clickOnHint} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
