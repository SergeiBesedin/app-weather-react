import React, { useState, useRef, useContext } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { LocationContext } from '../../context/location-context'
import { getSearchHints, HintData } from '../../data/search-hints-data'
import Input from '../ui/input/input'
import { Button } from '../ui/button/button'
import { SearchHints } from '../search-hints/search-hints'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as BackIcon } from '../../assets/icons/left-arrow.svg'
import styles from './search.module.scss'

export function Search() {
    const [value, setValue] = useState('')
    const [hints, setHints] = useState<Array<HintData>>([])

    const [isVisible, setVisible] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const { changeLocation } = useContext(LocationContext)

    const onBlurHandlerDebounce = useDebouncedCallback(() => onBlurHandler(), 300)
    const focusOnInputDebounce = useDebouncedCallback(() => inputRef.current?.focus())

    const classes = [`${styles.search}`, `${styles.searchOpen}`].join(' ')

    const onChangeHandler = (value: string) => {
        setValue(value)

        getSearchHints(value).then((data) => {
            setVisible(data.length > 0)
            setHints(data)
        })
    }

    const onFocusHandler = () => {
        setVisible(hints.length > 0)
        // TODO возможно, стоит убрать
        setSearchOpen(true)
    }

    const onBlurHandler = () => {
        setVisible(false)
        // TODO возможно, стоит убрать
        setSearchOpen(false)
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        changeLocation(value)
        setVisible(false)
        setSearchOpen(false)
    }

    const onHintClickHandler = (value: string) => {
        setValue(value)
        changeLocation(value)
        setSearchOpen(false)
        setVisible(false)
    }

    const onSearchClickHandler = () => {
        setSearchOpen(true)
        // TODO уточнить, стоит ли делать фокус
        focusOnInputDebounce()
    }

    const onBackClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setVisible(false)
        setSearchOpen(false)
    }

    return (
        <div className={searchOpen ? classes : styles.search}>
            <div className={styles.top}>
                <form onSubmit={onSubmitHandler}>
                    <Input
                        id="search"
                        type="text"
                        value={value}
                        placeholder="Название города"
                        autoComplete="off"
                        ref={inputRef}
                        classes={[styles.input]}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            onChangeHandler(e.target.value)
                        }
                        onFocus={onFocusHandler}
                        onBlur={onBlurHandlerDebounce}
                    />

                    <Button
                        classes={[styles.backBtn]}
                        disabled={false}
                        aria-label="Назад"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => onBackClickHandler(e)}
                    >
                        <BackIcon />
                    </Button>
                </form>

                <Button
                    classes={[styles.searchBtn]}
                    disabled={false}
                    aria-label="Поиск по названию города"
                    onClick={onSearchClickHandler}
                >
                    <SearchIcon />
                </Button>
            </div>

            <div className={styles.bottom}>
                {isVisible && (
                    <SearchHints hints={hints} clickOnHint={(e) => onHintClickHandler(e)} />
                )}
            </div>
        </div>
    )
}
