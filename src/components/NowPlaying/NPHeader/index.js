import "./styles.scss";
import { Button, Card, Icon, Image, Popup } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

function NPHeader({ gameTitle, gmData, lastScene, player, theWorld }) {

  const navigate = useNavigate();
  const handleBackButton = () => {
    navigate('/parties');
  }

  return (
    <div className="npheader-container">
      <Button 
        animated='fade'
        basic
        color="yellow"
        onClick={handleBackButton}
      >
        <Button.Content visible>
          <Icon
            flipped="horizontally"
            name='sign out'
          />
        </Button.Content>
        <Button.Content hidden>
          Quitter
        </Button.Content>
      </Button>
      <h1 className="npheader-container-title">{theWorld} – {gameTitle} – Scène {lastScene}</h1>
      <div className="npheader-container-popup">
      { player.map((item) =>
        (
          <Popup
            content={
              <Card
                className="ui centered card archetype-card"
              >
              <Image 
                src={item.archetype.picture}
                alt="class card icon"
                className='images-class'
              />
              <Card.Content>
              <Card.Header>{item.name}</Card.Header>
              <Card.Meta>Classe : {item.archetype.name}</Card.Meta>
              <Card.Description>
              {item.name} est mon personnage pour cette partie !
              </Card.Description>
              </Card.Content>
              </Card>
            }
            key={item.id}
            mouseEnterDelay={500}
            mouseLeaveDelay={500}
            size="large"
            on='hover'
            trigger={
              <Image
                src={item.archetype.picture}
                alt="class card icon"
                bordered
                circular
                size="tiny"
              />
            }
          />
        ))
      }
      </div>
    </div>
  );
}

export default NPHeader;