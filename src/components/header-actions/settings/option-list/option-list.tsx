import { Input } from '../../../ui/input/input'
import styles from './option-list.module.scss'

type Option = { optionValueId: string; optionValue: string }

interface OptionListProps {
    values: Array<Option>
}

export function OptionList({ values }: OptionListProps) {
    return (
        <>
            <ul>
                {values.map((value) => (
                    <li key={value.optionValueId} className={styles.option}>
                        <Input
                            id={value.optionValueId}
                            label={value.optionValue}
                            type={'radio'}
                            placeholder={''}
                            classes={['']}
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}
