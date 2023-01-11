import { Button, Image, Modal, Form, Icon } from 'semantic-ui-react'
import React, { useState } from 'react';
import random from './images.jpeg';
import './styles.scss';



function EmailEdit({ oldAvatar, oldEmail, setNewEmail }) {

  const [open, setOpen] = useState(false)
  const [emailSave, setEmailSave] = useState('')

  const handleEmailSave = (e) => {
    setEmailSave(e.target.value)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon className='user-profile-edit-icon' name='edit outline'/>}
    >
      <Modal.Header>Modifier l'email
      </Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={oldAvatar} wrapped />
        <Form  onSubmit={e => {
            e.preventDefault()
            setNewEmail(emailSave)
          }}
        >
          <Form.Field>
              <input placeholder={oldEmail} value={emailSave} onChange={handleEmailSave}/>
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='black' onClick={() => setOpen(false)}>
          Annuler
        </Button>
        <Button
          content="ok!"
          labelPosition='right'
          icon='checkmark'
          onClick={() => {setOpen(false)}}
          positive
          type='submit'
        />
      </Modal.Actions>
    </Modal>
  )
}

export default EmailEdit;