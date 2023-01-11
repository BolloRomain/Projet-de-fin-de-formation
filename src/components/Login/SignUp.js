import axios from "axios";
import {useNavigate} from 'react-router-dom';

function SignUp ({ 
  nickname,
  setNickname,
  email,
  setEmail,
  password,
  setPassword,
  handleLinkSignUp,
  }) {
  
    const navigate = useNavigate ();

    const userSignUpRequest = async (pseudo, email, password) => {
      try {
        const r = await axios({
          method: 'post',
          url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/signup`,
          headers: { 
            "Access-Control-Allow-Origin": "*",
            'Access-Control-Allow-Methods':'POST'
        },
          data: {
            nickname: pseudo,
            email: email,
            password: password,
          }
        });
      } catch (e) {
        console.log('error', e);
        if([404]){
          alert(`L'adresse email est déjà utilisée.`)
        }
      }
      finally {
        (localStorage.getItem('userToken') !== null ? navigate('/menu') : navigate('/login'));
      }
    }
    
  return (
    <div>
      <div className='ui center aligned container'>
      <form
        className='ui form inverted'
        onSubmit={e => {
          e.preventDefault()
          userSignUpRequest(nickname, email, password);
        }}
      >
        <div className='field'>
          <label>Pseudo</label>
          <input
            type='text'
            name='Pseudo'
            placeholder='Pseudo'
            value={nickname}
            onChange={e => {
              setNickname(e.target.value)
            }}
          />
        </div>
        <div className='field'>
          <label>Email</label>
          <input
            type='email'
            name='Email'
            placeholder='Email'
            value={email}
            onChange={e => {
              setEmail(e.target.value)
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
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
        </div>
        {/* <h4>Avatar</h4>
        <img
          className='ui small circular image signup-avatar'
          src='../../logo192.png'
          alt='avatar icon'
        /> */}
        <div className="container-buttons">
        <button 
        className='buttonSubmit' type='submit'>
          S'inscrire
        </button>
        <button
          className='toggleSign-in-up'
          type='button'
          onClick={handleLinkSignUp}
        >
          Déjà inscrit ? Se connecter
        </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default SignUp;