import React, { useState, useCallback, useEffect, Suspense } from 'react';
import { Switch, Route, Redirect, useLocation} from 'react-router-dom';
import MainNav from './pages/Navigation/MainNav';
import './main.css';
import {AnimatePresence} from 'framer-motion';
import { AuthContext } from './context/auth-context';

const Homepage = React.lazy(() => import('./pages/Homepage/Homepage'));
const Auth = React.lazy(() => import('./pages/Users/Auth'));
const Todo = React.lazy(() => import('./pages/ToDo/Components/Todo'));


function App() {
  const [userId, setUserId] = useState(false);
  const [name, setName] = useState(false);
  const [token, setToken] = useState(false);

  const login = useCallback((uid, name, token) => {
    console.log('Logged in!!!!')
    setUserId(uid);
    setName(name)
    setToken(token)
     localStorage.setItem(
       'userData',
       JSON.stringify({ userId: uid, name: name, token: token})
     )
  }, []);

  
  const logout = useCallback(() => {
    setUserId(null);
    setName(null)
    setToken(null)
    localStorage.removeItem('userData');
    
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.name, storedData.token)
    }
  }, [login]);


  const location = useLocation();

  let routes; 
  if(token) {
    routes = (
      <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <Homepage/>
          </Route>
          <Route path="/:userId/todo" exact>
            <Todo/>
              
          </Route>
          <Route path="/auth" exact>
            <Auth/>
          </Route>
          <Redirect to="/" />
        </Switch>
    )

  } else {
    routes = (
    <Switch location={location} key={location.pathname}>
          <Route path="/" exact>
            <Homepage/>
          </Route>
          
          <Route path="/auth" exact>
            <Auth/>
          </Route>
          <Redirect to="/" />
    </Switch>
    )
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token,
        userId,
        name,
        login,
        logout
      }}
      >
      <MainNav/>

       
      <AnimatePresence exitBeforeEnter>
        
        <Suspense fallback={<div>Loading.....</div>}>
          {routes}
        </Suspense>

      </AnimatePresence>
    </AuthContext.Provider>
  );
}

export default App;
