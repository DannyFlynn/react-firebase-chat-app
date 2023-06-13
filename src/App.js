import { useState } from 'react';
import Cookies from 'universal-cookie';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

//Pages
import UserCredentials from './pages/UserCredentials';

//components
import Chat from './components/Chat';

const cookies = new Cookies();


function App() {

  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));


  if (!isAuth) {
    return (
      <div className="App">
        <UserCredentials setIsAuth={setIsAuth} />
      </div>
    )
  }

  return (
    <div className="App">
      <Chat setIsAuth={setIsAuth} />
    </div>
  );
}

export default App;
