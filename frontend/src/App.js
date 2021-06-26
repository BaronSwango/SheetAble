// React Router Import
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages and Components
import LoginPage from "./Components/Authentication/LoginPage";
import SignupPage from "./Components/Authentication/SignupPage";
import HomePageProvider from "./Components/Home/HomePageProvider";
import SideBar from './Components/Navbar/SideBar';

// Redux
import { Provider } from 'react-redux'
import store from './Redux/store';
import { logoutUser, getUserData } from './Redux/Actions/userActions'
import { SET_AUTHENTICATED } from './Redux/types'


// Axios
import axios from 'axios';

// JWT
import jwtDecode from 'jwt-decode'


axios.defaults.baseURL = "http://localhost:8080"


// Token stuff 
// TODO: rewrite into function
const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  const ts = Date.now()
  const currentTime = Math.floor(ts/1000) - 7200
  if(decodedToken.exp < currentTime){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <SideBar />
        <Switch>
            <Route exact path="/" component={HomePageProvider} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/signup" component={SignupPage} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;