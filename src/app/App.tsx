import styles from './app.module.scss'
import { Header } from '../components/header/header'
import { Footer } from '../components/footer/footer'

function App() {
    return (
        <>
            <Header />
            <main className={styles.main}></main>
            <Footer />
        </>
    )
}

export default App
