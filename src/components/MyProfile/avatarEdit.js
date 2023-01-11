import { Button, Image, Modal, Form, Card, Icon } from 'semantic-ui-react'
import { useState } from 'react';
import blueMonster from "../../assets/images/avatar_monster_blue.jpg";
import greenMonster from "../../assets/images/avatar_monster_green.jpg";
import purpleMonster from "../../assets/images/avatar_monster_purple.jpg";
import redMonster from "../../assets/images/avatar_monster_red.jpg";
import './styles.scss';

function AvatarEdit({ oldAvatar, newAvatar, setNewAvatar }) {

  const [open, setOpen] = useState(false)
  const [avatarSave, setAvatarSave] = useState('')

  const allAvatars = [blueMonster, greenMonster, purpleMonster, redMonster];

  return (
    <Modal 
      className='user-profile-modal'
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Icon className='user-profile-edit-icon' name='edit outline'/>}
    >
      <Modal.Header>Modifier l'avatar
      </Modal.Header>
      <Modal.Content image scrolling>
        <Form  onSubmit={e => {
            e.preventDefault()
            setNewAvatar(avatarSave)
          }}
        >
          <Form.Field>
            <div className="ui stackable four column grid">
            {
              allAvatars.map((item) => 
                (
                  <label
                    className="column user-profile-avatarpicks-label"
                    key={item}
                    name="class-radio"
                  >
                    <input
                      type="radio"
                      className="user-profile-avatarpicks-radio"
                      name="class-radio"
                      onClick={(e) => { 
                        setNewAvatar(e.currentTarget.value)
                       }}
                      value={item}
                      />
                    <Card
                      className="ui centered card user-profile-avatarpicks-card">
                      <Image
                        src={item}
                        alt="avatar icon"
                      />
                    </Card>
                  </label>
                )
              )
            }
            </div>
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
          onClick={() => {
            setOpen(false)
          }}
          positive
          type='submit'
        />
      </Modal.Actions>
    </Modal>
  )
}

export default AvatarEdit;