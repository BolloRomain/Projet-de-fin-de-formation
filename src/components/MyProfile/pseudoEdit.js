import { Button, Image, Modal, Form, Icon } from 'semantic-ui-react'
import { useState } from 'react';
import random from './images.jpeg';
import './styles.scss';

function PseudoEdit({ oldAvatar, oldNickname, setNewNickname }) {

  const [open, setOpen] = useState(false)
  const [pseudoSave, setPseudoSave] = useState('')

  const handlePseudoSave = (e) => {
    setPseudoSave(e.target.value)
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon className='user-profile-edit-icon' name='edit outline'/>}
    >
      <Modal.Header>Modifier le pseudo
      </Modal.Header>
      <Modal.Content image>
        <Image size='medium' src={oldAvatar} wrapped />
        <Form  onSubmit={e => {
            e.preventDefault()
            setNewNickname(pseudoSave)
          }}
        >
          <Form.Field>
              <input placeholder={oldNickname} value={pseudoSave} onChange={handlePseudoSave}/>
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

export default PseudoEdit;