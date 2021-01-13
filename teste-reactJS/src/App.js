import React, {useState, useEffect}from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
      console.log(response)
    })
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title:  `Novo Projeto ${Date.now()}`,
      url: 'http://github.com/renehn',
      techs: ['Node.JS',  'ReactJS']
    })
      const repositorie = response.data
    setRepositories([...repositories, repositorie])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(
      repositorie => repositorie.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        
  {repositories.map(repositorie => (<li 
       key= {repositorie.id}>
            {repositorie.title} 
    <br></br> 
            {repositorie.url} 
    <br></br> 
            {repositorie.techs} 
    <br></br> 
            {repositorie.likes}

          <button onClick={() => handleRemoveRepository(repositorie.id)}>
         remove
          </button>
          </li>))}
      </ul>

      <button  type="button "onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
