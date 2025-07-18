import ReactDOM from 'react-dom/client'
import App from './App'
import { ReducerProvider } from './reducers/ReducerContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
<QueryClientProvider client={queryClient}>
  <ReducerProvider>
    <App />
  </ReducerProvider>
</QueryClientProvider>
)
