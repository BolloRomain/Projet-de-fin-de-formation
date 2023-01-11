import { useNavigate } from "react-router-dom";
import "./styles.scss";


function Rules({isDark}){

  const navigate = useNavigate();
  const handleBackButton =  () => {
  navigate('/menu');
}

  return (
    <main className={(isDark)? "rules-main-dark" : "rules-main"}>
      <button onClick={handleBackButton} className={(isDark)?"back-button-dark":"back-button"}>Retour</button>
      <div className="rules-first-container">
        <section className="rules-first-container-section">
          <h1 className="rules-h1" >
            Règles du jeu
          </h1>
          <h2 className="rules-h2">
            Bienvenue sur O'Dice & Dragons !
            Ici, vous pourrez prendre part à de grandes aventures dans de 
            nombreux univers en incarnant VOTRE personnage !
            Pour commencer, vous pouvez créer votre personnage en 
            choisissant sa classe et son nom.
            Vous pourrez ensuite rejoindre une partie ou en créer une 
            en utilisant un des mondes disponibles. 
            Vous ne trouvez pas de monde correspondant à l'aventure 
            que vous souhaitez vivre ? Pas de problème ! Vous pouvez en 
            créer un en indiquant son nom et une description 
            afin d'expliquer son univers aux autres joueurs !
            Si vous rejoignez une partie, vous êtes un joueur. 
            Laissez-vous guider par le maître du jeu, et choisissez vos 
            actions afin de faire avancer l'aventure !
            Si vous êtes le créateur d'une partie, vous en êtes 
            le Maître du Jeu ! Vous pouvez alors décrire la scène et choisir 
            quelles seront les actions que les joueurs pourront choisir. 
            En fonction de ces choix, vous devrez à nouveau décrire la scène 
            en déroulant l'histoire.
          </h2>
          
        </section>
      </div>
    </main>
  );
}


export default Rules;