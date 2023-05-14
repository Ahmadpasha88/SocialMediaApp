import {useState} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {v4} from 'uuid'
import {BsSendFill} from 'react-icons/bs'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import {storage} from './firebase-config'
import './App.css'

const CreatePost = () => {
  const [content, setContent] = useState('')
  // const [Url, setUrl] = useState('')
  const userName = Cookies.get('userName')
  const [title, setTitle] = useState('')
  const date1 = new Date()
  const date = `${date1.getDate()}-${
    date1.getMonth() + 1
  }-${date1.getFullYear()}  ${date1.getHours() % 12}:${date1.getMinutes()}`
  const onChangeContent = event => {
    setContent(event.target.value)
  }

  const onTitle = event => {
    setTitle(event.target.value)
  }

  const [imageUpload, setImageUpload] = useState(null)
  // const [imageUrls, setImageUrls] = useState([])
  // const imagesListRef = ref(storage, 'images/')

  const makePost = async () => {
    alert('Please wait few seconds Uploading....')

    if (imageUpload == null) return
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`)
    await uploadBytes(imageRef, imageUpload).then(async snapshot => {
      const getUrl = await getDownloadURL(snapshot.ref)
      setContent({...content, imgurl: getUrl})
      console.log(getUrl)
      const serverData = {
        picUrl: getUrl,
        postContent: content,
        Title: title,
        username: userName,
        Date: date,
      }
      await axios.post(
        'https://socialmedia-63ed9-default-rtdb.firebaseio.com/usersData.json/',
        serverData,
      )
    })
    alert('Successfully Submitted')
  }

  return (
    <div className="make-post">
      <h1 className="heading">Make a Post</h1>
      <input
        type="text"
        placeholder="Title"
        onChange={onTitle}
        className="title-container"
      />

      <textarea
        placeholder="Make a Post What's on your mind..."
        rows="12"
        cols="25"
        onChange={onChangeContent}
        className="textContainer"
      />
      <div className="App title-container">
        <input
          type="file"
          onChange={event => {
            setImageUpload(event.target.files[0])
          }}
        />
      </div>
      <button type="button" onClick={makePost} className="btn">
        Post <BsSendFill />
      </button>
    </div>
  )
}

export default CreatePost
