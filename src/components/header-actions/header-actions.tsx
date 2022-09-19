import { Button } from '../ui/button/button'
import { ReactComponent as Settings } from '../../assets/icons/settings.svg'
import styles from './header-actions.module.scss'

export function HeaderActions() {
    const click = () => {
        console.log('click')
    }

    return (
        <div className={styles.actions}>
            <Button classes={[styles.settings]} disabled={false} onClick={click}>
                <Settings />
            </Button>
        </div>
    )
}
