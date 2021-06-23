import React, { useEffect, useState } from 'react'

import {
  Button,
  Container,
  Col,
  Card,
  Form,
  Row,
  Spinner,
  Alert
} from 'react-bootstrap'

const styles = {
  title: {
    width: '100%',
    textAlign: 'center',
    color: '#2A2A2A',
    fontSize: '42px',
    fontWeight: 'bold'
  },
  formTitle: {
    color: '#2A2A2A',
    fontSize: '41px',
    fontWeight: 'bold'
  },
  submitButton: {
    width: 130,
    height: 30,
    backgroundColor: '#E0E1E2',
    borderWidth: 0,
    borderRadius: 20,
    marginRight: 20,
  }
}

const API_HOST = "https://t3c524zmxc.execute-api.eu-west-1.amazonaws.com/dev/speak"

const Main = () => {
  const [content, setContent] = useState('')
  const [voiceActors, setVoiceActors] = useState('')
  const [messages, setMessages] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await fetch(`${API_HOST}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'appliation/json',
      },
      body: JSON.stringify({
        text: content,
        voice: voiceActors
      })
    })

    const json = await response.json()
    console.log(json)
    setMessages(x => [...x, `$ Bucket: ${json.bucket}`])
    setMessages(x => [...x, `$ Key: ${json.key}`])
    setMessages(x => [...x, `$ objectUrl: ${json.url}`])

    const audio = new Audio(json.url);
    audio.play();

  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTitle">
          <Form.Label style={styles.formTitle}>METALAB AI SPEECH TESTER</Form.Label>
        </Form.Group>
        <Form.Group controlId="formSection">
          <Form.Control as="select" value={voiceActors} onChange={(e) => setVoiceActors(e.target.value)}>
            <option value="">Select a voice actor</option>
            <option value="Matthew">Matthew</option>
            <option value="Joanna">Joanna</option>
            <option value="Ivy">Ivy</option>
            <option value="Justin">Justin</option>
            <option value="Seoyeon">지니</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formContent">
          <Form.Control 
            as="textarea"
            rows={20} 
            value={content}
            onChange={(event) => {setContent(event.target.value)}}
            style={{width:'100%'}}
          />
        </Form.Group>
        <Button
          className="float-right"
          variant="primary"
          type="submit"
          style={styles.submitButton}
          >
          RUN
        </Button>
        <Form.Group controlId="formContent" style={{width:'550px', marginTop: '50px'}}>
          {messages.map( (e,i) =>
            <div key={i} style={{overflow:'hidden', fontSize:'12px', color: 'lightgreen',fontFamily: '', marginTop:'10px'}}>{ e }</div>
          )}
        </Form.Group>
      </Form>
    </>
  )
}

export default Main