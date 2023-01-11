import './styles.scss';

import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import { createNewWorld } from '../../services/api';

function CreateWorld({isDark}) {

  const [name, setName] = useState('');
  const [synopsis, setSynopsis] = useState('');

  const navigate = useNavigate();
  function handleLink() {
    navigate('/mondes');
  }
  const handleBackButton = () => {
    navigate('/mondes');
  }

  return (
    <main className={(isDark)? "user-new-warudo-create-page-dark" : "user-new-warudo-create-page" }>
      <button onClick={handleBackButton} className={(isDark)? "back-button-dark":"back-button"}>Retour</button>
      <form className="ui form user-new-warudo-create-box-world"  onSubmit={(e) => {
          e.preventDefault()
          createNewWorld(name, synopsis)
          handleLink();
        }}>
        <h2 className="user-new-warudo-create-worldCreateTitle">Créez un nouveau monde</h2>
        <section className="ui center aligned container">
          <h3 className="ui horizontal divider header">
            <i className="leaf icon"></i>
            <p className='sentence'>Nom du monde :</p>
            </h3>
          <div className="field">
            <label>
              <input type="text" name="name" value={name}
                placeholder="La Vallée de l'Eau Cloque" 
                onChange={(event) => {
                  setName(event.target.value);
                  console.log('world:', event.target.value)
                }} required
               />
            </label>
          </div>
        </section>
        <section className="user-new-warudo-create-world-create-section">
          <h3 className="ui horizontal divider header">
            <i className="book icon"></i>
           <p className='sentence'>Description du monde :</p> 
          </h3>
          <div className="column">
            <div className="field">
              <label>
                <textarea value={synopsis} onChange={(event) => {
                setSynopsis(event.target.value);
               }} required/>
              </label>
            </div>
          </div>
        </section>
        <button className="user-new-warudo-create-worldCreateButton" type="submit">Enregistrer</button>
      </form>
    </main>
  );
}

export default CreateWorld;
