import { forwardRef } from 'react'
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
    autoComplete?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

function Input(
    { id, type, classes, label, error, onChange, onFocus, onBlur, ...attrs }: InputProps,
    ref: React.Ref<HTMLInputElement>,
) {
    const classNames = [styles.custom, ...classes].join(' ')

    return (
        <>
            {label && (
                <label className={styles.label} htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                {...attrs}
                id={id}
                type={type}
                ref={ref}
                className={classNames}
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            {error && <span className="input-error">{error}</span>}
        </>
    )
}

export default forwardRef(Input)
