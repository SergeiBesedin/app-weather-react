import { Header } from '../components/header/header'
import { Content } from '../components/content/content'
import { Footer } from '../components/footer/footer'
import styles from './app.module.scss'

function App() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Content />
            </main>
            <Footer />
        </>
    )
}

export default App
