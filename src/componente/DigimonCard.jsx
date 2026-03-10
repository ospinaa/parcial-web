export const DigimonCard = ({ name, image, index, deleteDigimon }) => {

  return (
    <div>
      <img src={image} width="120" />
       <p>{name}</p>
         <button onClick={() => deleteDigimon(index)}>
        Eliminar
      </button>
    </div>
  );
};