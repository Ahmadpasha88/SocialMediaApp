import {BrowserRouter, Route, Switch} from 'react-router-dom'

import LoginForm from './LoginForm'
import Home from './Home'
import CreatePost from './CreatePost'
import UserProfile from './UserProfile'
import './App.css'
import ProtectedRoute from './ProtectedRoute'
// import DetailedView from './DetailedView'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={LoginForm} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/post" component={CreatePost} />
      <ProtectedRoute exact path="/userprofile" component={UserProfile} />
    </Switch>
  </BrowserRouter>
)

export default App
