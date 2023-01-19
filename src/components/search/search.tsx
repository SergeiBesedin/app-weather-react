import React, { useState, useContext } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { LocationContext } from '../../context/location-context'
import { getSearchHints, HintData } from '../../data/search-hints-data'
import { Input } from '../ui/input/input'
import { SearchHints } from '../search-hints/search-hints'
import styles from './search.module.scss'

export function Search() {
    const [value, setValue] = useState('')
    const [hints, setHints] = useState<Array<HintData>>([])
    const [isVisible, setVisible] = useState(false)
    const { changeLocation } = useContext(LocationContext)

    const closeHintsDebounce = useDebouncedCallback(() => setVisible(false), 300)

    const onChangeHandler = (value: string) => {
        setValue(value)

        getSearchHints(value).then((data) => {
            setVisible(data.length > 0)
            setHints(data)
        })
    }

    const onFocusHandler = () => {
        setVisible(hints.length > 0)
    }

    const onBlurHandler = () => {
        closeHintsDebounce()
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        changeLocation(value)
        setVisible(false)
    }

    const onHintClickHandler = (value: string) => {
        setValue(value)
        changeLocation(value)
    }

    return (
        <div className={styles.search}>
            <form onSubmit={onSubmitHandler}>
                <Input
                    id="search"
                    type="text"
                    value={value}
                    placeholder="Название города"
                    autoComplete="off"
                    classes={[styles.input]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChangeHandler(e.target.value)
                    }
                    onFocus={onFocusHandler}
                    onBlur={onBlurHandler}
                />
            </form>

            {isVisible && <SearchHints hints={hints} clickOnHint={(e) => onHintClickHandler(e)} />}
        </div>
    )
}
