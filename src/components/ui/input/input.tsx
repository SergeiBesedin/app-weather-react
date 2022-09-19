import styles from './input.module.scss'

interface InputProps {
    id: string
    classes: string[]
    placeholder: string
    label?: string
    error?: string
}

export function Input({ id, placeholder, classes, label, error }: InputProps) {
    const classNames = [...classes, styles.custom].join(' ')

    return (
        <div className='input-wrapper'>
            {label && (
                <label className='input-label' htmlFor={id}>
                    {label}
                </label>
            )}
            <input name={id} type='text' placeholder={placeholder} className={classNames} />
            {error && <span className='input-error'>{error}</span>}
        </div>
    )
}
