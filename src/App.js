import './assets/styles/global.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Routes from './Routes'
import Authorization from './components/Authorization'
function App() {
  return (
    <div className="App">
      <Routes />
      <ToastContainer />
      <Authorization />
    </div>
  )
}

export default App
