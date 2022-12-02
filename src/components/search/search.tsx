import React, { useState } from 'react'
import { Input } from '../ui/input/input'
import styles from './search.module.scss'

export function Search() {
    const [value, setValue] = useState<string>('')

    const onChangeHandler = (value: string) => {
        setValue(value)
    }

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('отправка формы')
    }

    return (
        <div className={styles.wrapper}>
            <form onSubmit={onSubmitHandler}>
                <Input
                    id='search'
                    type='text'
                    value={value}
                    placeholder='Город или район'
                    classes={[styles.input]}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        onChangeHandler(e.target.value)
                    }
                />
            </form>
        </div>
    )
}
