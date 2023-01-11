/* DEPENDENCIES */
import { useState } from 'react'

/* COMPONENTS */
import SignIn from './SignIn';
import SignUp from './SignUp';

/* STYLESHEETS */
import './styles.scss'

function Login () {

	const [linkSignUp, setLinkSignUp] = useState(true);

  const [nickname, setNickname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	/**
	 * Handles button click to switch from false (state default) to true,
	 * and so on
	 */
	const handleLinkSignUp = () => {
		setLinkSignUp(!linkSignUp)
	}

  return (
		// Ternary condition for sign up button
    <main className={(linkSignUp) ? 'appFalse signup-login-page' : 'appTrue signup-login-page'}>
      <div className="signup-login-box"> 
        <h1 className="header-banner-logo">
          O'Dice & Dragons
        </h1>
      {/* Renders depending on ternary condition */}
        {linkSignUp ? 
        <SignIn
          linkSignUp={setLinkSignUp}
          handleLinkSignUp={handleLinkSignUp}
        /> : 
        <SignUp
        nickname={nickname}
        setNickname={setNickname}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleLinkSignUp={handleLinkSignUp}
        />}
      </div>
    </main>
  )
}

export default Login
