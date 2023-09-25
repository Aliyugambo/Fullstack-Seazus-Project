// import './App.css';
import { useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { loadUser } from './Actions/User.actions';
import './components/common.css';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Login from './components/Login-Register/Login';
import Signup from './components/Login-Register/Signup';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // eslint-disable-next-line
  const { user,isAuthenticated } = useSelector(state => state.user); 
  

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
        <Route path='/' exact element={isAuthenticated? <Dashboard page={'myUrls'} /> : <Home />} ></Route>
        <Route path='/v/login' exact element={<Login />} ></Route>
        <Route path='/v/signup' exact element={<Signup />} ></Route>

        {/* Protected Routes */}
        <Route
          path='/v/dashboard-home'
          exact
          element={isAuthenticated ? <Dashboard page={'dashboard-home'  } /> : <Login />} >
        </Route>

        <Route
          path='/v/profile'
          exact
          element={isAuthenticated ? <Dashboard page={'profile'} /> : <Login />} >
        </Route>
        <Route
          path='/v/myUrls'
          exact
          element={isAuthenticated ? <Dashboard page={'myUrls'} /> : <Login />} >
        </Route>
        <Route
          path='/v/invite-people'
          exact
          element={isAuthenticated ? <Dashboard page={'invite-people'} /> : <Login />} >
        </Route>
        <Route
          path='/v/createUrl'
          exact
          element={isAuthenticated ? <Dashboard page={'createUrl'} /> : <Login />} >
        </Route>
        <Route
          path='/v/url/:hash'
          exact
          element={isAuthenticated ? <Dashboard page={'viewUrl'} /> : <Login />} >
        </Route>

        <Route
          path='/v/delete/:hash'
          exact
          element={isAuthenticated ? <Dashboard page={'editUrl'} /> : <Login />} >
        </Route>
        <Route
          path='/v/editUrl/:hash'
          exact
          element={isAuthenticated ? <Dashboard page={'editUrl'} /> : <Login />} >
        </Route>
     </Routes>
      </Router>
    </div>
  );
}

export default App;
