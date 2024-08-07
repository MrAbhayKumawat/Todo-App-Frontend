import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TodosProvider } from './context/TodosContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <TodosProvider>
    <App />

    </TodosProvider>
    <ToastContainer />

  </React.StrictMode>,
)
