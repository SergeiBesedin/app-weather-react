import { useState } from 'react'
import { Input } from '../ui/input/input'
import styles from './search.module.scss'

export function Search() {
    const [value, setValue] = useState<string>('')

    const onChangeHandler = (value: string) => {
        setValue(value)
    }

    return (
        <div className={styles.wrapper}>
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
        </div>
    )
}
