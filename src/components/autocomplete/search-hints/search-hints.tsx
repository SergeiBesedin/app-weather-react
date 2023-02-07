import { HintData } from '../../../service/search-hints-data'
import { Hint } from './hint/hint'
import styles from './search-hints.module.scss'

interface SearchHintsProps {
    hints: Array<HintData>
    clickOnHint: (value: string) => void
}

export function SearchHints({ hints, clickOnHint }: SearchHintsProps) {
    return (
        <div className={styles.hints}>
            <ul>
                {hints.map((hint) => (
                    <Hint key={hint.id} city={hint.city} clickOnHint={clickOnHint} />
                ))}
            </ul>
        </div>
    )
}
