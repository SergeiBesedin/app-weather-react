import styles from './button.module.scss'

interface ButtonProps {
    classes: string[]
    disabled: boolean
    onClick: () => void
    children?: React.ReactNode
}

export function Button({ children, classes, disabled, onClick, ...attrs }: ButtonProps) {
    const classNames = [styles.custom, ...classes].join(' ')

    return (
        <button disabled={disabled} className={classNames} onClick={onClick} {...attrs}>
            {children}
        </button>
    )
}
