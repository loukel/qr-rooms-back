import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

const SocialForm = () => {
  const [name, setName] = useState('')
  const [snapchat, setSnapchat] = useState('')
  const [instagram, setInstagram] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(name, snapchat, instagram)
  }

  return ( 
    <Form onSubmit={handleSubmit}>
      <Form.Control type='input' placeholder='name' onChange={(e) => setName(e.target.value)} />
      <Form.Control type='input' placeholder='instagram username' onChange={(e) => setInstagram(e.target.value)} />
      <Form.Control type='input' placeholder='snapchat username' onChange={(e) => setSnapchat(e.target.value)} />
      <Button type='submit' className='w-100'>
        Add your socials
      </Button>
    </Form>
   )
}
 
export default SocialForm