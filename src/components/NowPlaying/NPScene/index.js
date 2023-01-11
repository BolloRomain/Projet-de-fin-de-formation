import "./styles.scss";

function NPScene({ allScenes }) {
	return (
    <>
      <hr className='np-scene-divide'></hr>
      <section className="ui center aligned column character-section">
      <h3 className="np-scene-subtitle">
          <i className="history icon" />
          Les scènes précédentes :
        </h3>
      {
        allScenes.map((item) =>
        <div key={item.id}>
          <h3>Tour : {item.number}</h3>
          <p className="np-scene-description" key={item.text}>
          {item.text}
          </p>
        </div>
        )
      }
      </section>
    </>
  );
}

export default NPScene;