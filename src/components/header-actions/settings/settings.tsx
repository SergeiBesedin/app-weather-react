import { Modal } from '../../ui/modal/modal'
import { OptionGroup } from './option-group/option-group'
import options from './settings.json'
import styles from './settings.module.scss'

// TODO передавать options извне

export function Settings() {
    return (
        <Modal classes={[styles.settings]}>
            <div>
                {options.map((option) => (
                    <OptionGroup
                        key={option.optionId}
                        optionGroup={option.optionGroup}
                        values={option.values}
                    />
                ))}
            </div>
        </Modal>
    )
}
