import styles from './header.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Search } from '../search/search'

export function Header() {
    const classNames = ['container', styles.container].join(' ')

    return (
        <header className={styles.header}>
            <div className={classNames}>
                <Logo className={styles.logo} />
                <Search />
            </div>
        </header>
    )
}
