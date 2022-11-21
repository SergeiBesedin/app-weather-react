import { useContext } from 'react'
import { SettingsContext } from '../../../../context/settings-context'
import { Input } from '../../../ui/input/input'
import { Option } from '../../../../typings/typings'
import styles from './option-list.module.scss'

interface OptionListProps {
    unitName: string
    values: Array<Option>
}

export function OptionList({ unitName, values }: OptionListProps) {
    const { units, changeUnit } = useContext(SettingsContext)

    const onChangeHandler = (option: { [key: string]: string }) => {
        changeUnit(option)
    }

    return (
        <ul>
            {values.map((value) => (
                <li key={value.optionValueId} className={styles.option}>
                    <Input
                        id={value.optionValueId}
                        value={value.unit}
                        name={unitName}
                        label={value.optionValue}
                        type={'radio'}
                        checked={units[unitName] === value.unit}
                        classes={['']}
                        onChange={() => onChangeHandler({ [unitName]: value.unit })}
                    />
                </li>
            ))}
        </ul>
    )
}
