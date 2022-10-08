import { Button } from '../ui/button/button'
import { ReactComponent as Search } from '../../assets/icons/search.svg'
import { ReactComponent as Settings } from '../../assets/icons/settings.svg'
import styles from './header-actions.module.scss'

export function HeaderActions() {
    const click = () => {
        console.log('click')
    }

    return (
        <div className={styles.actions}>
            <Button classes={[styles.search]} disabled={false} onClick={click}>
                <Search />
            </Button>
            <Button classes={[styles.settings]} disabled={false} onClick={click}>
                <Settings />
            </Button>
        </div>
    )
}
