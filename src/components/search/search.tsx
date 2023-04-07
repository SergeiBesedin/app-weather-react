import { useSearch } from '../../hooks/use-search'
import { Autocomplete } from '../autocomplete/autocomplete'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as BackIcon } from '../../assets/icons/left-arrow.svg'
import { Button, Input } from '../ui/index'
import styles from './search.module.scss'

export function Search() {
    const {
        clearHistory,
        onBackClickHandler,
        onChangeHandler,
        onFocusHandler,
        onHintClickHandler,
        onSearchClickHandler,
        onSubmitHandler,
        searchHistory,
        searchOpen,
        visible,
        inputValue,
        inputRef,
        onBlurHandlerDebounce,
    } = useSearch()

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
                        onFocus={onFocusHandler}
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
                <Autocomplete
                    inputValue={inputValue}
                    visible={visible}
                    searchHistory={searchHistory}
                    clickOnHint={onHintClickHandler}
                    clearHistory={clearHistory}
                />
            </div>
        </div>
    )
}
