import './App.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import {api} from "../src/services/index"

function App() {

  const [gato, setGato] = useState([]);

  //Metodos HTTP : GET, POST, DELETE, UPDATE

  //GET
  useEffect(() => {
    axios.get("http://localhost:5555/gatos").then((response) => {
      setGato(response.data);
    })
  }, []);

  //POST
  const addGato = () => {
    
    const gatoName = document.getElementById("gatoName") as HTMLInputElement
    const gatoAge = document.getElementById("gatoAge") as HTMLInputElement

    const newGato = {
      name:gatoName.value,
      age:gatoAge.value,
    };

    if(gatoName.value == "" || gatoAge.value == ""){
      alert("Por favor, insira um nome e idade.");
    }else{
      api.post("http://localhost:5555/gatos", newGato).then((response) =>{
        setGato([...gato,response.data]);
      })
    }

  };

  //DELETE
  const deleteGato = async (id: number) => {
    await api.delete(`http://localhost:5555/gatos/${id}`);
    const newGatos = gato.filter((gato:any) => gato.id !== id); 
    setGato(newGatos);
  };

  //UPDATE
  const updateGato = async (id: number) => {
    const updatedName = document.getElementById(`updatedName${id}`) as HTMLInputElement;
    const updateAge = document.getElementById(`updateAge${id}`) as HTMLInputElement;

    const updatedGato = {
      name:updatedName.value,
      age:updateAge.value,
    };

    await axios.put(`http://localhost:5555/gatos/${id}`,updatedGato)
    const newGatos = gato.filter((gato:any) => gato.id !== id);
    setGato(newGatos);
  };

  return (
    <>
      <h1>Gatos</h1>
      <main>
        <div>
          <ul>
          {gato.map((gato:any) => (
             <li key={gato.id}>
              {gato.name} - {gato.age}{" "} 
              <input type="text" id={`updatedName${gato.id}`} />
              <input type="number" id={`updateAge${gato.id}`} />
              <button onClick={() => updateGato(gato.id)}>Atualizar</button>
              <button onClick={() => deleteGato(gato.id)}>Deletar</button>
             </li>
           ))}
          </ul>
        </div>
        <div>
          <input type="text" id="gatoName" placeholder="Nome" />
          <input type="number" id="gatoAge" placeholder="Idade" />
          <button onClick={addGato} >Adicionar Gato</button>
        </div>
      </main>
    </>
  )
}

export default App;
