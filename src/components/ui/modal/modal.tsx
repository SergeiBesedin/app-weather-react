import { Button } from '../button/button'
import { ReactComponent as CloseIcon } from '../../../assets/icons/close.svg'
import styles from './modal.module.scss'

interface ModalProps {
    children: React.ReactNode
    classes: string[]
    close: () => void
    title?: string
}

export function Modal({ children, classes, close, title }: ModalProps) {
    const classNames = [styles.modal, ...classes].join(' ')

    return (
        <>
            <div className={styles.overlay} onClick={close}></div>
            <div className={classNames}>
                <div className={styles.container}>
                    <Button
                        type={'button'}
                        classes={[styles.close]}
                        disabled={false}
                        onClick={close}
                        aria-label="Закрыть всплывающее окно"
                    >
                        <CloseIcon />
                    </Button>
                    {title && <h3>{title}</h3>}
                    {children}
                </div>
            </div>
        </>
    )
}
