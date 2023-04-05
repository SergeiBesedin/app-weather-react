import { getIcon } from '../../../utils/get-icon'
import { Image } from '../../ui/index'
import styles from './error.module.scss'

/*
401 - ключ не указан или не активирован

404 - указано неправильное название города

429 - превышен лимит вызовов API (сделали более 60 вызовов в минуту)
*/

const ERROR_STATUSES: ErrorMessage = {
    401: {
        title: 'Сервис временно недоступен',
        message: 'Мы ведем технические работы, чтобы сделать наш сайт лучше',
        image: 'connectionError',
    },
    404: {
        title: 'По вашему запросу ничего не нашлось',
        message: 'Проверьте его на наличие опечаток и попробуйте изменить ваш запрос',
        image: 'emptySearch',
    },
    429: {
        title: 'Превышен лимит вызовов API',
        message: 'Уменьшите количество вызовов API в соответствии с ограничениями',
        image: 'connectionError',
    },
}

type ErrorMessage = Record<number, { title: string; message: string; image: string }>

interface ErrorMessageProps {
    status: number
}

export function ErrorComp({ status }: ErrorMessageProps) {
    const classNames = ['container', styles.container].join(' ')

    const { title, message, image } = ERROR_STATUSES[status]

    return (
        <div className={styles.error}>
            <div className={classNames}>
                <div className={styles.wrapper}>
                    <Image alt={title} src={getIcon(image)} classes={['']} />
                </div>
                <div>
                    <h2 className={styles.title}>{title}</h2>
                    <p className={styles.message}>{message}</p>
                </div>
            </div>
        </div>
    )
}
