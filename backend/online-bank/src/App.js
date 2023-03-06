import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css.map';
import { Route, Routes } from 'react-router-dom';
import ClientPage from './components/layout/clientsPage/ClientPage';
import EmployeesPage from './components/layout/employeePage/EmployeesPage';
import CreditsPage from './components/layout/creditsPage/CreditsPage';
import Layout from './components/layout/Layout';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<ClientPage/>}></Route>
          <Route path='/clients' element={<ClientPage/>}></Route>
          <Route path='/employees' element={<EmployeesPage/>}></Route>
          <Route path='/credits' element={<CreditsPage/>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
