import './App.css';
import Layout from './pages/Layout';
import Dashboard from './pages/Dashboard';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Configuration from './pages/Configuration';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='configuration' element={<Configuration />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;