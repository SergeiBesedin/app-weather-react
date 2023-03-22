import { OptionList, UnitsCategories } from '../option-list/option-list'
import { Option } from '../../../../typings/typings'
import styles from './option-group.module.scss'

interface OptionGroupProps {
    optionGroup: string
    unitName: string
    values: Array<Option>
}

export function OptionGroup({ optionGroup, unitName, values }: OptionGroupProps) {
    return (
        <div className={styles.optionGroup}>
            <h4>{optionGroup}</h4>
            <OptionList values={values} unitName={unitName as UnitsCategories} />
        </div>
    )
}
