import './styles.scss';
import PseudoEdit from './pseudoEdit';
import EmailEdit from './emailEdit';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PasswordEdit from './passwordEdit';
import AvatarEdit from './avatarEdit';

function MyProfile({isDark}) {

  const [isSaved, setIsSaved] = useState(false)

  const [oldEmail, setOldEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [oldAvatar, setOldAvatar] = useState('');
  const [oldNickname, setOldNickname] = useState('');

  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAvatar, setNewAvatar] = useState('');
  const [newNickname, setNewNickname] = useState('');

  /**
   * Axios request for user sign-in
   * @returns axios response
   */
  const userSignInData = async (email, avatar, password, nickname) => {
    const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/users/infos`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':"GET",
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          username: email,
          avatar: avatar,
          password: password,
          nickname: nickname,
        }
      });
      setOldAvatar(r.data.avatar);
      setOldEmail(r.data.email);
      setOldNickname(r.data.nickname);
      setOldPassword(r.data.password);
    } catch (e) {
    }
  }

  const userDataUpdate = async(email, password, avatar, nickname) => {
    const userToken = localStorage.getItem('userToken');
    try {
      const r = await axios({
        method: 'put',
        url: "http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/users",
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'PUT',
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          email: email,
          password: password,
          avatar: avatar,
          nickname: nickname,
        }
      });
    } catch (e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
    userSignInData()
  }, [])

  const navigate = useNavigate();
  const handleBackButton =  () => {
  navigate('/menu');
}

  return (
    <main className={(isDark)? "user-profile-dark" : "user-profile"}>
    <button onClick={handleBackButton} className={(isDark)?"back-button-dark":"back-button"}>Retour</button>
      <div className="user-profile-box">
        <h1 className='user-profile-profilTitle'>Mon profil</h1>
        <form onSubmit={(e) => {
          e.preventDefault();
          setIsSaved(true)
          userDataUpdate(( newEmail !== '' ? newEmail : oldEmail), ( newPassword !== '' ? newPassword : oldPassword), ( newAvatar !== '' ? newAvatar : oldAvatar), ( newNickname !== '' ? newNickname : oldNickname))
        }
        }
        >
          {/* AVATAR */}
          <div className="user-profile-obj">
            <div className="user-profile-content">
              Avatar
              <AvatarEdit 
                oldAvatar={oldAvatar}
                newAvatar={newAvatar}
                setNewAvatar={setNewAvatar}
              />
              <div className="avatarBlock">
                <img src={( newAvatar !== '' ? newAvatar : oldAvatar)} alt="current user avatar" className='user-profile-avatar'/>   
              </div>
            </div>
          </div>

          {/* NICKNAME */}
          <div className="user-profile-obj">
            <div className="user-profile-content">
              <div className="user-profile-content">
                Pseudo
                <PseudoEdit
                  oldAvatar={oldAvatar}
                  oldNickname={oldNickname}
                  newNickname={newNickname}
                  setNewNickname={setNewNickname}
                />
              </div>
            </div>
            <div className='centeredContent'>
              {( newNickname !== '' ? newNickname : oldNickname)}
            </div>
          </div>
          <div className="user-profile-obj">
            <div className="user-profile-content">
                <div className="user-profile-content">
                  Email
                  <EmailEdit
                    oldAvatar={oldAvatar}
                    oldEmail={oldEmail}
                    newEmail={newEmail}
                    setNewEmail={setNewEmail}
                  />
                </div>
            </div>
            <div className='centeredContent'>
            {( newEmail !== '' ? newEmail : oldEmail)}
            </div>
          </div>
          <div className="user-profile-obj">
            <div className="user-profile-content">
              <div className="user-profile-content">
                Mot de passe
                <PasswordEdit
                  oldPassword={oldPassword}
                  newPassword={newPassword}
                  setNewPassword={setNewPassword}
                />
              </div>
            </div>
            <div className='user-profile-centeredContent'>
              ***********
            </div>
          </div>
          <button 
              className="user-profile-enregistrerButton"
              type="submit"
              value={isSaved} 
            >
              Enregistrer
          </button>
        </form>
      </div>
    </main>
  )
}
    
    export default MyProfile;