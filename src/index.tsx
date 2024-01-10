import ReactDOM from 'react-dom/client';
import {App} from "./components/routes/App";

//Import min bootstrap styles
import 'bootstrap/dist/css/bootstrap.min.css';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);

