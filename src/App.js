import React, { useEffect, useState } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([]); // inicializando os repositories

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    // setRepositories([...repositories, `Novo repositorie`]); // forma antiga

    const response = await api.post('repositories', {
      title: 'Contacts',
      url: 'https://github.com/devgabrieldejesus/contacts',
      techs: ['PHP', 'HTML']
    });

    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    
    setRepositories(repositories.filter(
      repositorie => repositorie.id != id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie =>(

          <li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
            Remover
            </button>
          </li>
         
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
