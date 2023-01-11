import axios from "axios";
import { useEffect, useState } from "react";
import { Form } from "semantic-ui-react";
import "./styles.scss";

function NPActions(
  {
    actions,
    activePlayer,
    gameId,
    userToken
  }) {
  const [action, setAction] = useState();

  const sendPlayerAction = async(actionId) => {
    try {
      const r = await axios({
        method: 'get',
        url: `http://noahlancien-server.eddi.cloud/projet-2-odice-dragon-back/public/api/scenes/${gameId}/${activePlayer}/${actionId}`,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Access-Control-Allow-Methods':'GET',
          Authorization: `Bearer ${userToken}`,
        }
      });
      } catch (e) {
      console.log('error', e);
    }
  }

  useEffect(() => {
  })

  return (
    <Form
      onSubmit={() => {
        sendPlayerAction(action);
      }}
    >
      <Form.Field>
      <h3 className="np-actions-subtitle">
        <i className="shield icon" />
        Mon action pour ce tour :
      </h3>
      </Form.Field>
      <Form.Field>
      {
        actions.map((item) => 
          (
            <div
              className="np-actions-checkbox"
              key={item.id}
            >
              <label
                className="np-actions-checkbox-label"
                htmlFor="np-actions"
              >
              <input
                className="np-actions-checkbox-input"
                name="np-actions"
                onChange={ () => {
                  setAction(item.id);
                }}
                type="radio"
                value={item.id}
              />
                {item.name}
              </label>
            </div>
          )
        )
      }
      </Form.Field>
      <button className="np-actions-save-button np-actions-links" type='submit'>Enregistrer</button>
    </Form>
  );
}

export default NPActions;