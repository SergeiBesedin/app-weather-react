import { Input } from '../ui/input/input'
import styles from './search.module.scss'

export function Search() {
    return (
        <div className={styles.wrapper}>
            <Input id='search' type='text' placeholder='Город или район' classes={[styles.input]} />
        </div>
    )
}
