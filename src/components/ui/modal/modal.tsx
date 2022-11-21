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
                    {title && <h3>{title}</h3>}
                    {children}
                </div>
            </div>
        </>
    )
}
