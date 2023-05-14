import Cookies from 'js-cookie'
import './App.css'

const UserProfile = () => {
  const name = Cookies.get('userName')
  const mail = Cookies.get('mailId')

  return (
    <div className="make-post underline">
      <h1>User Data</h1>
      <h1>Name: {name}</h1>
      <p>MailId: {mail}</p>
    </div>
  )
}

export default UserProfile
