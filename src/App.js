import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'

import Photo from './Photo'
const clientID = process.env.REACT_APP_ACCESS_KEY
const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [loading, setLoading] = useState(false)
  const [photos, setPhotos] = useState([])
  const [page, setPage] = useState(0)
  const [value, setValue] = useState('')
  const getPhotos = async () => {
    let url
    const pageUrl = `&page=${page}`
    const queryUrl = `&query=${value}`
    if (value) {
      url = `${searchUrl}?client_id=${clientID}${pageUrl}${queryUrl}`
    } else {
      url = `${mainUrl}?client_id=${clientID}${pageUrl}`
    }
    setLoading(true)
    try {
      const response = await fetch(url)
      console.log(url)
      const data = await response.json()
      setPhotos((oldPhotos) => {
        if (value && page == 1) {
          return data.results
        }
        if (value) {
          return [...oldPhotos, ...data.results]
        } else {
          return [...oldPhotos, ...data]
        }
      })
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(() => {
    getPhotos()
  }, [page])
  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 2
      ) {
        setPage((old) => old + 1)
      }
    })
    return () => window.removeEventListener('scroll', event)
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault()
    setPage(1)
  }
  return (
    <section className='container'>
      <h2>zigBEE-Wallpaper</h2>
      <div className='head'>
        <form>
          <input
            type='text'
            placeholder='Search'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type='submit' onClick={handleSubmit} className='btn'>
            <FaSearch />
          </button>
        </form>
      </div>
      <div className='photo-container'>
        {photos.map((photo, index) => {
          return <Photo key={index} photo={photo} />
        })}
      </div>
      {loading && <h2 className='Loading'>Loading...</h2>}
    </section>
  )
}

export default App
