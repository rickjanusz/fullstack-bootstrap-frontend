import React, { useEffect, useState } from 'react'
import axios from 'axios'

// console.log("ID", process.env.VIMEO_CLIENT_ID)

const CLIENT_IDENTIFIER = '376106bac6dbc18249caf87aee8263df11d40a05'
const CLIENT_SECRET =
  'n4qy6djabAvd8ShQBtsn+Fxiv4BuAxKx5ixhkfOvwfHsV56gYiS4RIIlbGDLwHd3Y99Iz8Lu0WZS+y+I2FDvcDLHT9GskFTfWRE7Il5ml4zqCX7GSojEtasdk0GMUgb+'
const ACCESS_TOKEN = 'd244fa15174fcdf174b668bf47622991'

export default function TutorialPage() {
  const [vimeo, setVimeo] = useState()

  async function getVideosForChannel(ACCESS_TOKEN) {
    const { data } = await axios.get(
      'https://api.vimeo.com/me/albums/8053059/videos',
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    )
    await console.log(data.data)
    await setVimeo(data.data)
  }

  async function checkReady() {
    try {
      const { data } = await axios.post(
        'https://api.vimeo.com/oauth/authorize/client',
        { grant_type: 'client_credentials' },
        {
          auth: {
            username: CLIENT_IDENTIFIER,
            password: CLIENT_SECRET,
          },
        }
      )

      getVideosForChannel(ACCESS_TOKEN)
    } catch (error) {
      if (error.response.status === 429) {
        alert(
          'The Vimeo api has received too many requests, please try again in an hour or so'
        )
      }
    }
  }

  useEffect(() => {
    checkReady()
  }, [])

  return (
    <div>
      <ul>
        {vimeo?.map(({ resource_key, link, name }) => (
          <li key={resource_key}>
            <a href={link}>{name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
