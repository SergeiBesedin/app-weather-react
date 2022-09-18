import styles from './header.module.scss'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'

export function Header() {
    return (
        <header className={styles.header}>
            <div className='container'>
                <Logo className={styles.logo} />
            </div>
        </header>
    )
}
