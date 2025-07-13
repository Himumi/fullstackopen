import ReactDOM from 'react-dom/client'
import App from './App'
import { ReducerProvider } from './reducers/ReducerContext'

ReactDOM.createRoot(document.getElementById('root')).render(
<ReducerProvider>
  <App />
</ReducerProvider>
)
