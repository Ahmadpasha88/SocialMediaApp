import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyD9bBAvsOir3Ua1jn6v9APXN-6ugorohn0',
  authDomain: 'socialmedia-63ed9.firebaseapp.com',
  databaseURL: 'https://socialmedia-63ed9-default-rtdb.firebaseio.com',
  projectId: 'socialmedia-63ed9',
  storageBucket: 'socialmedia-63ed9.appspot.com',
  messagingSenderId: '961671108122',
  appId: '1:961671108122:web:59532145fb3e7cfea623a3',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

export const storage = getStorage(app)

export default auth
