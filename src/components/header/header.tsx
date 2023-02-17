import { useLocationProvider } from '../../context/location-context'
import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import { Search } from '../search/search'
import { HeaderActions } from '../header-actions/header-actions'
import styles from './header.module.scss'

export function Header() {
    const { changeLocationToDefault } = useLocationProvider()

    const classNames = ['container', styles.container].join(' ')

    const onLogoClick = () => changeLocationToDefault()

    return (
        <header className={styles.header}>
            <div className={classNames}>
                <div className={styles.logo} role="button" onClick={onLogoClick}>
                    <Logo />
                </div>

                <Search />

                <HeaderActions />
            </div>
        </header>
    )
}
