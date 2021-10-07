import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router'
import Header from '../../components/header/Header'
import { socket } from '../../lib/socket'
import GatheringQR from './GatheringQR'

const Gathering = () => {
  const { gatheringId } = useParams()
  const history = useHistory()

  useEffect(() => {
    // If query param is null -> create room
    // If query param is invalid -> display error, suggest creating a room
    // If query param is valid -> join room

    if (gatheringId) {
      // Try to join room
      socket.emit('gathering:join', gatheringId)
      socket.on('gathering', (data) => {
        console.log(data)
      })
    } else {
      // Create room
      socket.emit('gathering:create')
      socket.on('gathering', gathering => {
        history.push(`/${gathering.id}`)
      })
    }
  }, [])

  return (
    <div className='container'>
      <Header />
      <div className='text-center p-3'>
        <GatheringQR gatheringId={gatheringId}/>
      </div>
    </div>
  )
}

export default Gathering
