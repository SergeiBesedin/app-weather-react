import { useState, useEffect } from 'react'
import { useDebounce } from '../../hooks/use-debounce'
import { useSearchHistory } from '../../hooks/use-search-history'
import { getSearchHints, HintData } from '../../data/search-hints-data'
import { SearchHistory } from './search-history/search-history'
import { SearchHints } from './search-hints/search-hints'
import styles from './autocomplete.module.scss'

interface AutocompleteProps {
    inputValue: string
    visible: boolean
    clickOnHint: (value: string) => void
}

export function Autocomplete({ inputValue, visible, clickOnHint }: AutocompleteProps) {
    const [hints, setHints] = useState<Array<HintData>>([])
    const { getHistory } = useSearchHistory()

    const searchHistory = getHistory()

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
                <SearchHistory history={searchHistory} clickOnHint={clickOnHint} />
            </div>
        )
    }

    return <></>
}
