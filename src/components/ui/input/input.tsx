import styles from './input.module.scss'

interface InputProps {
    id: string
    type: string
    classes: string[]
    placeholder: string
    label?: string
    error?: string
}

export function Input({ id, type, placeholder, classes, label, error, ...attrs }: InputProps) {
    const classNames = [styles.custom, ...classes].join(' ')

    return (
        <>
            {label && (
                <label className='input-label' htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                {...attrs}
                name={id}
                type={type}
                placeholder={placeholder}
                className={classNames}
            />
            {error && <span className='input-error'>{error}</span>}
        </>
    )
}
