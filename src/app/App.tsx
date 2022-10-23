import { Header, Content, Footer } from '../components/index'
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
