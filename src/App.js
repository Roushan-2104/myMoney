import {Route,Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './page/Home/Home';
import Login from './page/Login/Login';
import Signup from './page/SignUp/Signup';
import {useAuthContext} from './hooks/useAuthContext'

function App() {
  const {authIsReady, user} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <>
          <Navbar/>
          <div style={{marginLeft:'10px',marginRight:'10px'}}>
            <Routes>
              <Route path='/' element={user ? <Home/> : <Navigate to='/login'/>}/>
              <Route path='/login' element={user ? <Navigate to='/'/> : <Login/>} />
              <Route path='/signup' element={user ? <Navigate to='/'/> : <Signup/>} />
            </Routes>
          </div>
        </>
      )}
    </div>
  );
}

export default App
