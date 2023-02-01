import { useState, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useLocationProvider } from '../../context/location-context'
import { SearchHints } from '../search-hints/search-hints'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as BackIcon } from '../../assets/icons/left-arrow.svg'
import { Button } from '../ui/button/button'
import Input from '../ui/input/input'
import styles from './search.module.scss'

export function Search() {
    const [inputValue, setInputValue] = useState('')
    // Состояние для переключения стилей (десктоп-мобила)
    const [searchOpen, setSearchOpen] = useState(false)
    // Состояние для переключения видимости подсказок
    const [visible, setVisible] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const { changeLocation } = useLocationProvider()

    const onBlurHandlerDebounce = useDebouncedCallback(() => onBlurHandler(), 300)

    const focusOnInputDebounce = useDebouncedCallback(() => inputRef.current?.focus())

    const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value.trim())
        setVisible(true)
    }

    const onBlurHandler = () => {
        setVisible(false)
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (inputValue === '') return

        changeLocation(inputValue)
        setVisible(false)
        setSearchOpen(false)
    }

    const onHintClickHandler = (value: string) => {
        setInputValue(value)
        changeLocation(value)
        setSearchOpen(false)
        setVisible(false)
    }

    const onSearchClickHandler = () => {
        setSearchOpen(true)
        focusOnInputDebounce()
    }

    const onBackClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setVisible(false)
        setSearchOpen(false)
    }

    const classes = [styles.search]

    // Вешаем дополнительный класс для мобильных устройств
    if (searchOpen) {
        classes.push(styles.searchOpen)
    }

    return (
        <div className={classes.join(' ')}>
            <div className={styles.top}>
                <form onSubmit={onSubmitHandler}>
                    <Input
                        id="search"
                        type="text"
                        value={inputValue}
                        placeholder="Название города"
                        autoComplete="off"
                        ref={inputRef}
                        classes={[styles.input]}
                        onChange={onChangeHandler}
                        onBlur={onBlurHandlerDebounce}
                    />

                    <Button
                        type={'button'}
                        classes={[styles.backBtn]}
                        disabled={false}
                        aria-label="Назад"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => onBackClickHandler(e)}
                    >
                        <BackIcon />
                    </Button>
                </form>

                <Button
                    type={'button'}
                    classes={[styles.searchBtn]}
                    disabled={false}
                    aria-label="Поиск по названию города"
                    onClick={onSearchClickHandler}
                >
                    <SearchIcon />
                </Button>
            </div>

            <div className={styles.bottom}>
                <SearchHints
                    inputValue={inputValue}
                    visible={visible}
                    clickOnHint={(e) => onHintClickHandler(e)}
                />
            </div>
        </div>
    )
}
