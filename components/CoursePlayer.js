/* eslint-disable camelcase */
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import axios from 'axios'
import Player from '@vimeo/player'
import formatTime from '../lib/formatTime'
import VimeoStyles from './styles/VimeoStyles'

export default function CoursePlayer({
  albumId,
  clientId,
  clientSecret,
  accessToken,
  userId,
}) {
  const [vimeo, setVimeo] = useState()
  const [channel, setChannel] = useState()
  const vimPlayer = useRef()
  const vimeoBtnRef = useRef([])

  function createVideoBtnRefs() {
    console.log('im called')
    console.log({ vimeo })
    vimeoBtnRef.current = vimeo.map((vid, i) => {
      if (Object.keys(vid).length !== 0) {
        console.log('Adding ref to: ', vid)
        console.log(vimeoBtnRef.current[i])
        return vimeoBtnRef.current[i] ?? React.createRef()
      }
    })
  }

  async function getChannelInfo(access_token) {
    const { data } = await axios.get(
      `https://api.vimeo.com/me/albums/${albumId}/`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    setChannel(data)
    console.log({ channel })
    localStorage.setItem('channel', JSON.stringify(data))
  }

  async function getVideosForChannel(access_token) {
    const { data } = await axios.get(
      `https://api.vimeo.com/me/albums/${albumId}/videos?per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    setVimeo(data.data)
    console.log({ vimeo })
    localStorage.setItem('vimeo', JSON.stringify(data.data))
  }

  async function checkReady() {
    try {
      await axios.post(
        'https://api.vimeo.com/oauth/authorize/client',
        { grant_type: 'client_credentials' },
        {
          auth: {
            username: clientId,
            password: clientSecret,
          },
        }
      )
      getChannelInfo(accessToken)
      getVideosForChannel(accessToken)
    } catch (error) {
      if (error.response.status === 429) {
        alert(
          'The Vimeo api has received too many requests, please try again in an hour or so'
        )
      }
    }
  }

  function loadVideo(e) {
    const current = document.querySelector('.current')
    current.classList = ''
    const next = e.target
    next.classList = 'current'
    const nextVideo = e.target.getAttribute('data-video-id')
    vimPlayer.current.loadVideo(nextVideo)
  }

  function playNextVideo() {
    const current = document.querySelector('.current')
    current.classList = ''
    const nextSibling =
      current.parentElement.nextElementSibling.firstElementChild
    nextSibling.classList = 'current'
    const nextVideo = nextSibling.getAttribute('data-video-id')
    vimPlayer.current.loadVideo(nextVideo)
  }

  const vimeoList = []

  useLayoutEffect(() => {
    //  handle caching the course data
    // const localVimeo = localStorage.getItem('vimeo')
    // const localChannel = localStorage.getItem('channel')
    // if (localVimeo && localChannel) {
    //   setVimeo(JSON.parse(localVimeo))
    //   setChannel(JSON.parse(localChannel))
    //   // createVideoBtnRefs()
    // } else {
      checkReady()
    // }

    if (vimeo) {
      createVideoBtnRefs()
    }
  }, [])

  useEffect(() => {
    const iframe = document.querySelector('#vimeoPlayer')
    vimPlayer.current = new Player(iframe, {
      id: userId,
      width: '100%',
      loop: false,
    })
    vimPlayer.current.on('ended', playNextVideo)
  }, [])

  return (
    <VimeoStyles>
      <div
        ref={vimPlayer}
        data-vimeo-id={498448894}
        data-vimeo-autoplay="true"
        data-vimeo-loop="false"
        id="vimeoPlayer"
      />
      <div id="courseNav">
        <h1>{channel && channel.name}</h1>
        <div id="courseWrapper">
          <ul>
            {vimeo?.map(({ resource_key, name, duration, uri }, i) => {
              const u = uri.split('/videos/')
              const videoID = u[1]
              vimeoList.push(videoID)

              // create course video numbers for each tutorial
              let j = '0'
              if (i + 1 < 10) {
                j = `0${i + 1}`
              } else {
                j = i + 1
              }

              if (i === 0) {
                return (
                  <li key={resource_key}>
                    <button
                      type="button"
                      data-video-id={videoID}
                      className="current"
                      onClick={loadVideo}
                      ref={vimeoBtnRef.current[i + 1]}
                    >
                      <span className="moduleNum">{j}</span>
                      {name}{' '}
                      <span className="duration">{formatTime(duration)}</span>
                    </button>
                  </li>
                )
              }
              return (
                <li key={resource_key} className={`li_${i + 1}`}>
                  <button
                    type="button"
                    data-video-id={videoID}
                    onClick={loadVideo}
                    ref={vimeoBtnRef.current[i + 1]}
                  >
                    <span className="moduleNum">{j}</span>
                    {name}{' '}
                    <span className="duration">{formatTime(duration)}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </VimeoStyles>
  )
}
