import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import AccContext from './Context/AccContext';
import PageContext from './Context/PageContext';
import { Toaster } from 'react-hot-toast';
import SwitchPage from './Pages/SwitchPage';
import OperationContext from './Context/OperationContext';

function App() {
  const [page, setPage] = useState(0);
  const [accNumber, setAccNumber] = useState('');
  const [operationReport, setOperationReport] = useState({});

  return (
    <div className="App">
      <Toaster
        position='top-center'
        reverseOrder={false}
        toastOptions={{
          duration: 3000
        }}
      />
      <AccContext.Provider value={{ accNumber, setAccNumber }}>
        <PageContext.Provider value={{ page, setPage }}>
          <OperationContext.Provider value={{operationReport, setOperationReport}}>
            <SwitchPage />
          </OperationContext.Provider>
        </PageContext.Provider>
      </AccContext.Provider>
    </div>
  );
}

export default App;
