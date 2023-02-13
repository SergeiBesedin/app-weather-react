import { useState } from 'react'
import { Button } from '../ui/index'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { Settings } from './settings/settings'
import options from '../../configuration/settings.json'
import styles from './header-actions.module.scss'

export function HeaderActions() {
    const [modalActive, setModalActive] = useState(false)

    const open = () => setModalActive(true)
    const close = () => setModalActive(false)

    return (
        <div className={styles.headerActions}>
            <div className={styles.actions}>
                <Button
                    type={'button'}
                    classes={[styles.settings]}
                    disabled={false}
                    aria-label="Настройки"
                    onClick={open}
                >
                    <SettingsIcon />
                </Button>
            </div>
            {modalActive && <Settings options={options} close={close} />}
        </div>
    )
}
