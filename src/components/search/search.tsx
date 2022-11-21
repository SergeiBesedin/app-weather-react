import { Input } from '../ui/input/input'
import styles from './search.module.scss'

export function Search() {
    const onChangeHandler = () => {
        console.log('test')
    }

    return (
        <div className={styles.wrapper}>
            <Input
                id='search'
                type='text'
                value=''
                placeholder='Город или район'
                classes={[styles.input]}
                onChange={() => onChangeHandler()}
            />
        </div>
    )
}
