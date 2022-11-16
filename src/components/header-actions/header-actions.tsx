import { Button } from '../ui/button/button'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import styles from './header-actions.module.scss'

export function HeaderActions() {
    const click = () => {
        console.log('click')
    }

    return (
        <div className={styles.actions}>
            <Button classes={[styles.search]} disabled={false} onClick={click}>
                <SearchIcon />
            </Button>
            <Button classes={[styles.settings]} disabled={false} onClick={click}>
                <SettingsIcon />
            </Button>
        </div>
    )
}
