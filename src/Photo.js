import React from 'react'
import { FcDownload, FcLike } from 'react-icons/fc'

const Photo = ({ photo }) => {
  const {
    likes,
    urls: { regular },
    links: { download },
    user: {
      name,
      links: { html },
      profile_image: { large },
    },
  } = photo
  return (
    <div className='photo'>
      <img src={regular} alt='' />
      <footer className='footer'>
        <div className='user'>
          <div className='user-img'>
            <a href={html}>
              <img title='user profile' src={large} alt={name} />
            </a>
            <a href={html}>
              <h4 title='user name'>{name}</h4>
            </a>
            <div className='img-download'>
              <a href={download} title='download'>
                <FcDownload />
              </a>
            </div>
          </div>
          <div className='likes'>
            <span>{likes}</span>
            <a href='' title='Likes'>
              <FcLike />
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Photo
