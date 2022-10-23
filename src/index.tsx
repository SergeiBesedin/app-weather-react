import ReactDOM from 'react-dom/client'
import App from './app/app'
import { SettingsState } from './context/settings-context'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <SettingsState>
        <App />
    </SettingsState>,
)
