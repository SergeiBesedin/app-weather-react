import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/use-debounce'
import { getSearchHints, HintData } from '../../service/search-hints-data'
import { SearchHistory } from './search-history/search-history'
import { SearchHints } from './search-hints/search-hints'
import styles from './autocomplete.module.scss'

interface AutocompleteProps {
    inputValue: string
    visible: boolean
    searchHistory: Array<string>
    clickOnHint: (value: string) => void
    clearHistory: () => void
}

export function Autocomplete({
    inputValue,
    visible,
    searchHistory,
    clickOnHint,
    clearHistory,
}: AutocompleteProps) {
    const [hints, setHints] = useState<Array<HintData>>([])

    // Используем хук, чтобы отложить вызов API
    const debouncedInputValue = useDebounce<string>(inputValue, 300)

    useEffect(() => {
        getSearchHints(debouncedInputValue).then((hints) => setHints(hints))
    }, [debouncedInputValue])

    if (visible && hints.length) {
        return (
            <div className={styles.autocomplete}>
                <SearchHints hints={hints} clickOnHint={clickOnHint} />
            </div>
        )
    }

    if (visible && !hints.length && searchHistory.length) {
        return (
            <div className={styles.autocomplete}>
                <SearchHistory
                    history={searchHistory}
                    clickOnHint={clickOnHint}
                    clearHistory={clearHistory}
                />
            </div>
        )
    }

    return <></>
}
