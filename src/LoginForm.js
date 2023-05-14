import {useState} from 'react'
import Cookies from 'js-cookie'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth'
import './App.css'
import auth from './firebase-config'
// import CreatePost from './CreatePost'

const LoginForm = props => {
  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  // const [isLog, setIsLog] = useState(false)
  const [user, setUser] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [name, setName] = useState('')
  const [loginStatus, setLoginStatus] = useState(false)

  onAuthStateChanged(auth, currentUser => {
    setUser(currentUser)
  })

  const register = async () => {
    try {
      setUser(
        await createUserWithEmailAndPassword(
          auth,
          registerEmail,
          registerPassword,
        ),
      )
      console.log(user)
      const {accessToken} = user
      Cookies.set('accessToken', accessToken, {
        expires: 30,
        path: '/',
      })

      Cookies.set('mailId', registerEmail, {
        expires: 30,
      })

      Cookies.set('userName', name, {expires: 30})
      const {history} = props

      history.replace('/')
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  const login = async () => {
    try {
      setUser(await signInWithEmailAndPassword(auth, loginEmail, loginPassword))

      const {accessToken} = user
      console.log(user)
      Cookies.set('accessToken', accessToken, {
        expires: 30,
        path: '/',
      })
      Cookies.set('mailId', loginEmail, {
        expires: 30,
      })

      const {history} = props
      history.replace('/')
    } catch (error) {
      setErrorMsg(error.message)
    }
  }

  const onStatus = () => {
    setLoginStatus(!loginStatus)
    setErrorMsg('')
    setLoginEmail('')
    setName('')
    setLoginPassword('')
    setRegisterEmail('')
    setRegisterPassword('')
  }

  const onName = e => {
    setName(e.target.value)
  }

  const logout = async () => {
    await signOut(auth)
  }
  const jwtToken = Cookies.get('accessToken')

  if (jwtToken !== undefined) {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="login-interface">
      <div>
        <img
          src="https://media.istockphoto.com/photos/internet-and-social-media-vector-icons-picture-id500321431?k=6&m=500321431&s=612x612&w=0&h=ndvLehLQrdfk169EV7ZwIR1sQdL4iSsp5ZAB7rMEsmo="
          className="loginImage"
          alt="pic"
        />
      </div>
      <div className="loginForm">
        {!loginStatus ? (
          <div>
            <h1 className="heading"> Login </h1>
            <input
              type="mail"
              placeholder="Email..."
              className="input-field"
              onChange={event => {
                setLoginEmail(event.target.value)
              }}
            />

            <br />

            <input
              placeholder="Password..."
              type="password"
              className="input-field"
              onChange={event => {
                setLoginPassword(event.target.value)
              }}
            />
            <br />

            <button type="button" onClick={login} className="btn">
              {' '}
              Login
            </button>
            <br />
            <p className="msgToUser">
              If you don't have an account please register here!...
            </p>
            <button type="button" onClick={onStatus} className="btn">
              Register
            </button>
            <p className="errorMsg">{errorMsg}</p>
          </div>
        ) : (
          <div>
            <h1 className="heading"> Register User </h1>
            <input
              type="text"
              className="input-field"
              placeholder="Enter Your Name"
              onChange={onName}
            />

            <br />
            <input
              type="mail"
              placeholder="Enter Your Email..."
              className="input-field"
              onChange={event => {
                setRegisterEmail(event.target.value)
              }}
            />
            <br />

            <input
              type="password"
              placeholder="Enter Your Password..."
              className="input-field"
              onChange={event => {
                setRegisterPassword(event.target.value)
              }}
            />

            <br />

            <button type="button" onClick={register} className="btn">
              {' '}
              Create User
            </button>

            <br />
            <p className="msgToUser">
              If you have an account please Login here!...{' '}
            </p>
            <button type="button" onClick={onStatus} className="btn">
              Login
            </button>
            <p className="errorMsg">{errorMsg}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoginForm
