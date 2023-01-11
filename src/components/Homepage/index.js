import { useRef } from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function Homepage(){
  
  const ref = useRef(null);
  const handleClick = () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };

  return (
    <main className="homepage-main">
      <div className="homepage-first-container">
        <section className="homepage-first-container-section">
          <h1 className="homepage-h1" >
            O’Dice & Dragons
          </h1>
          <h2 className="homepage-h2">
            O’Dice & Dragons est un site de jeu de rôle au tour par tour. Sa simplicité d’utilisation et son interface épurée permettent d’ouvrir les portes du jeu de rôle aussi bien aux rôlistes confirmés qu’aux néophytes aventureux.
          </h2>
          <button
            className="homepage-links"
          >
          <Link to="/login">Commencer l'aventure dès maintenant !</Link>  
          </button>
          <button 
          className="homepage-links" 
          onClick={handleClick} 
          >À Propos
            {/* <a href={handleClick} className="homepage-links">À Propos</a> */}
          </button>

          
        </section>
      </div>
      <div className="homepage-second-container">
        <section className="homepage-second-container-section" >
          <h2 className="homepage-h2" id="apropos">
            À Propos
          </h2>
          <p className="homepage-p" ref={ref} >
            Ce jeu a été conçu par la fine fleur du dev, nous avons eu besoin des meilleurs pour votre bonheur. Vous l'avez devinez il s'agit de Julien Héritier notre Product Owner en plus d'être référent techno coté Back chanteur mondialement connu pour le titre "badger". Lenz Marescal fameux Lead Dev Front que les USA ont voulu racheter, fort heureusement nous avons pas plus loyal et fidèle soldat. Noah Lancien meilleur référent Git, Lead Dev Back et surtout artiste reconnu dans le monde entier. Samuel-Tehei Garcia Cubino il n'a pas seulement un nom aussi long qu'un narco traficant, il est incontestablement un demi-dieu, c'est pour cela qu'il notre référent techno coté Front. Et puis pour finir Romain Bollo Scrum Master, fière d'avoir une équipe si dévouée à ses cotés.
          </p>
          <button className="homepage-links">
             <Link to="/login">Commencer l'aventure dès maintenant !</Link>
          </button>
        </section>
      </div>
    </main>
  );
}


export default Homepage;