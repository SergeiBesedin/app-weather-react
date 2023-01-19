import { Hint } from './hint/hint'
import { HintData } from '../../data/search-hints-data'
import styles from './search-hints.module.scss'

interface SearchHintsProps {
    hints: Array<HintData>
    clickOnHint: (value: string) => void
}

export function SearchHints({ hints, clickOnHint }: SearchHintsProps) {
    return (
        <div className={styles.hints}>
            <div className={styles.container}>
                <ul>
                    {hints.map((hint) => (
                        <Hint key={hint.id} city={hint.city} clickOnHint={clickOnHint} />
                    ))}
                </ul>
            </div>
        </div>
    )
}
