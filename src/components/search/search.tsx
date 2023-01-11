import React, { useState, useContext } from 'react'
import { LocationContext } from '../../context/location-context'
import { Input } from '../ui/input/input'
import styles from './search.module.scss'

export function Search() {
    const [value, setValue] = useState<string>('')
    const { changeLocation } = useContext(LocationContext)

    const onChangeHandler = (location: string) => {
        setValue(location)
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        changeLocation(value)
        setValue('')
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={onSubmitHandler}>
                <Input
                    id="search"
                    type="text"
                    value={value}
                    placeholder="Город или район"
                    classes={[styles.input]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChangeHandler(e.target.value)
                    }
                />
            </form>
        </div>
    )
}
