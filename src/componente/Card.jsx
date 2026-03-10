import { useEffect, useState } from "react";
import { DigimonCard } from "./DigimonCard";

export const Card = () => {

   const [list, setList] = useState([]);          
  const [name, setName] = useState("");          
    const [image, setImage] = useState("");        
     const [error, setError] = useState(null);      

  useEffect(() => {                              

    const getDigimon = async () => {

      try {

        const res = await fetch("https://digi-api.com/api/v1/digimon?pageSize=10");
        const data = await res.json();

        setList(data.content);

      } catch (err) {

        setError("Error cargando digimon");

      }

    };
    
    getDigimon();
                }, []);

  const addDigimon = (e) => {                    

    e.preventDefault();

    if (name === "" || image === "") {
      setError("ponga algo puej");
      return;
    }

    const newDigimon = {
      name: name,
      image: image
    };

    setList([...list, newDigimon]);

    setName("");
    setImage("");
    setError(null);

  };

  const deleteDigimon = (index) => {             

    const filtered = list.filter((_, i) => i !== index);
    setList(filtered);

  };

  return (
    <>
      <h1>lista de digi</h1>
      <form>
        <input
            placeholder="Nombre"
             value={name}
                 onChange={(e) => setName(e.target.value)}
        />

        <input
            placeholder="Imagen URL"
           value={image}
          onChange={(e) => setImage(e.target.value)}
        />
  
           <button onClick={(e) => addDigimon(e)}>
          Agregar</button>

      </form>

          {error && <p>{error}</p>}

      <div>
        {list.map((digimon, index) => (
          <DigimonCard
               key={index}
            name={digimon.name}
              image={digimon.image}
              index={index}
              deleteDigimon={deleteDigimon}
          />
        ))}

      </div>

    </>

  );

};
