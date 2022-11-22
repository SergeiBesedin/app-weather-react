import { useState } from 'react'
import { Button } from '../ui/button/button'
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { Settings } from './settings/settings'
import options from '../../configuration/settings.json'
import styles from './header-actions.module.scss'

export function HeaderActions() {
    const [modalActive, setModalActive] = useState<boolean>(false)
    const open = () => setModalActive(true)
    const close = () => setModalActive(false)

    const click = () => {
        console.log('click')
    }

    return (
        <div className={styles.headerActions}>
            <div className={styles.actions}>
                <Button
                    classes={[styles.search]}
                    disabled={false}
                    aria-label='Поиск по названию города'
                    onClick={click}
                >
                    <SearchIcon />
                </Button>
                <Button
                    classes={[styles.settings]}
                    disabled={false}
                    aria-label='Настройки'
                    onClick={open}
                >
                    <SettingsIcon />
                </Button>
            </div>
            {modalActive && <Settings options={options} close={close} />}
        </div>
    )
}
