import ReactDOM from 'react-dom/client'
import App from './app/App'
import { SettingsState } from './context/settings-context'
import { LocationState } from './context/location-context'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <LocationState>
        <SettingsState>
            <App />
        </SettingsState>
    </LocationState>,
)
