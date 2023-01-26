import { useState, useEffect } from 'react'
import { useDebounce } from './../../hooks/use-debounce'
import { Hint } from './hint/hint'
import { getSearchHints, HintData } from '../../data/search-hints-data'
import styles from './search-hints.module.scss'

interface SearchHintsProps {
    inputValue: string
    visible: boolean
    clickOnHint: (value: string) => void
}

export function SearchHints({ inputValue, visible, clickOnHint }: SearchHintsProps) {
    const [hints, setHints] = useState<Array<HintData>>([])

    // Используем хук, чтобы отложить вызов API
    const debouncedInputValue = useDebounce<string>(inputValue, 300)

    const classes = [styles.hints]

    if (!hints.length || !visible) {
        classes.push(styles.hide)
    }

    useEffect(() => {
        getSearchHints(debouncedInputValue).then((hints) => setHints(hints))
    }, [debouncedInputValue])

    return (
        <div className={classes.join(' ')}>
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
