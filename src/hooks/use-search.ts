import { useState, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useLocationProvider } from '../context/location-context'
import { useSearchHistory } from '../hooks/use-search-history'

// Логика для работы с поиском

export function useSearch() {
    const [inputValue, setInputValue] = useState('')
    // Состояние для переключения стилей (десктоп-мобила)
    const [searchOpen, setSearchOpen] = useState(false)
    // Состояние для переключения видимости подсказок
    const [visible, setVisible] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null)

    const { changeLocation } = useLocationProvider()

    const { getHistory, saveToHistory, clearHistory } = useSearchHistory()

    const searchHistory = getHistory()

    const onBlurHandlerDebounce = useDebouncedCallback(() => onBlurHandler(), 300)

    const focusOnInputDebounce = useDebouncedCallback(() => inputRef.current?.focus())

    const onChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = e.target.value.replace(/\d/, '')

        setInputValue(formattedValue)
        setVisible(true)
    }

    const onFocusHandler = () => {
        setVisible(true)
    }

    const onBlurHandler = () => {
        setVisible(false)
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const value = inputValue.trim()

        if (value === '') return

        changeLocation(value)
        saveToHistory(value)

        setVisible(false)
        setSearchOpen(false)
    }

    const onHintClickHandler = (value: string) => {
        setInputValue(value)
        changeLocation(value)
        saveToHistory(value)

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

    return {
        inputValue,
        searchOpen,
        visible,
        searchHistory,
        onBlurHandlerDebounce,
        inputRef,
        clearHistory,
        onChangeHandler,
        onFocusHandler,
        onSubmitHandler,
        onHintClickHandler,
        onSearchClickHandler,
        onBackClickHandler,
    }
}
