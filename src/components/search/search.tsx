import React, { useState, useContext } from 'react'
import { LocationContext } from '../../context/location-context'
import { getHints, CityData } from '../../data/hints-data'
import { Input } from '../ui/input/input'
import { Hints } from '../hints/hints'
import styles from './search.module.scss'

export function Search() {
    const [value, setValue] = useState<string>('')
    const [hints, setHints] = useState<Array<CityData>>([])
    const { changeLocation } = useContext(LocationContext)

    const onChangeHandler = (value: string) => {
        setValue(value)
        getHints(value).then((data) => setHints(data))
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        changeLocation(value)
        setValue('')
    }

    const onClickHandler = (value: string) => {
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
                />
            </form>

            <Hints cities={hints} clickOnHint={(e) => onClickHandler(e)} />
        </div>
    )
}
