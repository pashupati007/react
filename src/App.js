import 'bootstrap/dist/css/bootstrap.min.css'
// import 'react-toastify/dist/ReactToastfy.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AppRouting from './AppRouting';

function App() {
  return (
    <div className="App">
    <AppRouting />
    <ToastContainer />
    </div>
  );
}

export default App;
