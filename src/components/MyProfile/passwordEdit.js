import { Button, Image, Modal, Form, Icon } from 'semantic-ui-react'
import { useState } from 'react';
import random from './images.jpeg';
import './styles.scss';



function PasswordEdit({ oldAvatar, oldPassword, setNewPassword }) {

  const [open, setOpen] = useState(false)
  const [passwordSave, setPasswordSave] = useState('')

  const handlePasswordSave = (e) => {
    setPasswordSave(e.target.value)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon className='user-profile-edit-icon' name='edit outline'/>}
    >
      <Modal.Header>Modifier le mot de passe
      </Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={oldAvatar} wrapped />
        <Form  onSubmit={e => {
            e.preventDefault()
            setNewPassword(passwordSave)
          }}
        >
          <Form.Field>
              <input placeholder={oldPassword} value={passwordSave} onChange={handlePasswordSave}/>
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

export default PasswordEdit;