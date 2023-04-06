import { useSettingsProvider } from '../../../../context/settings-context'
import { AllUnitsType } from '../../../../utils/utils'
import { Input } from '../../../ui/index'
import { Option } from '../../../../typings/typings'
import styles from './option-list.module.scss'

export type UnitsCategories = 'temp' | 'speed' | 'pressure'

interface OptionListProps {
    unitName: UnitsCategories
    values: Array<Option>
}

export function OptionList({ unitName, values }: OptionListProps) {
    const { units, changeUnit } = useSettingsProvider()

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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            changeUnit({ [e.target.name]: e.target.value as AllUnitsType })
                        }
                    />
                </li>
            ))}
        </ul>
    )
}
