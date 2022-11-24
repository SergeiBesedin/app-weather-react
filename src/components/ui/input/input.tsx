import styles from './input.module.scss'

interface InputProps {
    id: string
    type: string
    value: string
    classes: string[]
    name?: string
    label?: string
    placeholder?: string
    checked?: boolean
    error?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ id, type, classes, label, error, onChange, ...attrs }: InputProps) {
    const classNames = [styles.custom, ...classes].join(' ')

    return (
        <>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <input {...attrs} id={id} type={type} className={classNames} onChange={onChange} />
            {error && <span className='input-error'>{error}</span>}
        </>
    )
}
