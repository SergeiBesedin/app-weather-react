import { OptionList } from '../option-list/option-list'
import styles from './option-group.module.scss'

type Option = { optionValueId: string; optionValue: string }

interface OptionGroupProps {
    optionGroup: string
    values: Array<Option>
}

export function OptionGroup({ optionGroup, values }: OptionGroupProps) {
    return (
        <div className={styles.optionGroup}>
            <h4>{optionGroup}</h4>
            <OptionList values={values} />
        </div>
    )
}
