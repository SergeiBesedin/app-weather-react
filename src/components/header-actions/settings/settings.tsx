import { Modal } from '../../ui/index'
import { OptionGroup } from './option-group/option-group'
import { Option } from '../../../typings/typings'
import styles from './settings.module.scss'

interface ISettings {
    optionId: string
    optionGroup: string
    unitName: string
    values: Array<Option>
}

interface SettingsProps {
    options: Array<ISettings>
    close: () => void
}

export function Settings({ options, close }: SettingsProps) {
    return (
        <Modal classes={[styles.settings]} close={close}>
            <div className={styles.optionGroups}>
                {options.map((option) => (
                    <OptionGroup
                        key={option.optionId}
                        optionGroup={option.optionGroup}
                        unitName={option.unitName}
                        values={option.values}
                    />
                ))}
            </div>
        </Modal>
    )
}
