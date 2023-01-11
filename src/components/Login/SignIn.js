import { useState , reload } from "react";
// import { getUserTokenAtSignIn } from "../../services/api";
import {useNavigate} from 'react-router-dom';
import axios from "axios";


function SignIn ({ handleLinkSignUp }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
 
  const getUserTokenAtSignIn = async (email, password) => {
    try {
      const r = await axios({
        method: 'post',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/login_check`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'POST'
        },
        data: {
          username: email,
          password: password,
        }
      });
      localStorage.setItem('userToken', r.data.token);
    } catch (e) {
     if ([401]){ alert(`Email ou Mot de passe invalide.`)}
    } finally {
      (localStorage.getItem('userToken') !== null ? navigate('/menu') : navigate('/login'));
      window.location.reload();
    }
  }
 // requete à alert( ) pour signaler mauvaise correspondance pass et email

                  
  return (
    <>
      <div className='ui center aligned container'>
        <form
          className='ui form inverted'
          onSubmit={e => {
            e.preventDefault();
            getUserTokenAtSignIn(email, password);
            //
          }
          }
        >
          <div className='field'>
            <label>Email</label>
            <input
              type='email'
              name='Email'
              placeholder='Email'
              value={email}
              onChange={ (e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className='field'>
            <label>Mot de passe</label>
            <input
              type='password'
              name='Mot de passe'
              placeholder='Mot de passe'
              value={password}
              onChange={ (e) => {
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="container-button">
            <button className='buttonSubmit'
            type='submit'>
            Connexion
            </button>
            <button
              className='toggleSign-in-up'
              type='button' onClick={handleLinkSignUp}
            >
              Pas encore inscrit? Inscription
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignIn;