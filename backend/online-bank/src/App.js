import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import { OidcProvider } from '@axa-fr/react-oidc';
import ClientPage from './components/layout/clientsPage/ClientPage';
import EmployeesPage from './components/layout/employeePage/EmployeesPage';
import CreditsPage from './components/layout/creditsPage/CreditsPage';
import Layout from './components/layout/Layout';
import AccountInfoPage from './components/layout/accountInfoPage/AccountInfoPage';
import CreditsInfoPage from './components/layout/creditsInfoPage/CreditsInfoPage';

const configuration = {
    client_id: 'employee-web-app',
    redirect_uri: window.location.origin + '/authentication/callback',
    silent_redirect_uri: window.location.origin + '/authentication/silent-callback', 
    scope: 'openid profile WebAPI',
    authority: 'https://demo.duendesoftware.com',
    service_worker_relative_url: '/OidcServiceWorker.js',
    service_worker_only: true,
};

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<ClientPage/>}></Route>
          <Route path='/clients' element={<ClientPage/>}></Route>
          <Route path='/employees' element={<EmployeesPage/>}></Route>
          <Route path='/credits' element={<CreditsPage />}></Route>
          <Route path='/account/:accountId/:userId' element={<AccountInfoPage />}></Route>
          <Route path='/credits/:userId' element={<CreditsInfoPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
