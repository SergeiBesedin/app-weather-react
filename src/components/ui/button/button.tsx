import styles from './button.module.scss'

interface ButtonProps {
    children: React.ReactNode
    classes: string[]
    disabled: boolean
    onClick: () => void
}

export function Button({ children, classes, disabled, onClick, ...attrs }: ButtonProps) {
    const classNames = [styles.custom, ...classes].join(' ')

    return (
        <button disabled={disabled} className={classNames} onClick={onClick} {...attrs}>
            {children}
        </button>
    )
}
