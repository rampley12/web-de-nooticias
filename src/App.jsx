import React, { useState, useEffect } from 'react';

const App = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [noticias, setNoticias] = useState([]);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState(null);

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const response = await fetch('https://newsapi.org/v2/top-headlines/sources?apiKey=6ef90a59b27542c39c50d42843808321');
      const data = await response.json();
      setCategorias(data.sources);
    } catch (error) {
      console.log(error);
    }
  };

  const obtenerNoticias = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/top-headlines?apiKey=6ef90a59b27542c39c50d42843808321&category=${categoriaSeleccionada}`);
      const data = await response.json();
      setNoticias(data.articles);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategoria = (event) => {
    setCategoriaSeleccionada(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    obtenerNoticias();
  };

  const mostrarNoticia = (noticia) => {
    setNoticiaSeleccionada(noticia);
  };

  const cerrarNoticia = () => {
    setNoticiaSeleccionada(null);
  };

  return (
    <div>
      <h1>Título</h1>
      <form onSubmit={handleSubmit}>
        <select value={categoriaSeleccionada} onChange={handleChangeCategoria}>
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.name}
            </option>
          ))}
        </select>
        <button type="submit">Buscar</button>
      </form>
      <div>
        {noticias.map((noticia) => (
          <div key={noticia.title} className="card" onClick={() => mostrarNoticia(noticia)}>
            <h2>{noticia.title}</h2>
            <p>{noticia.description}</p>
            <img src={noticia.urlToImage} alt={noticia.title} />
            <a href={noticia.url} target="_blank" rel="noopener noreferrer">Leer más</a>
            <p>{noticia.content}</p>
            <p>Autor: {noticia.author}</p>
            <p>Fecha: {noticia.publishedAt}</p>
          </div>
        ))}
      </div>
      {noticiaSeleccionada && (
        <div className="card">
          <h2>{noticiaSeleccionada.title}</h2>
          <p>{noticiaSeleccionada.description}</p>
          <img src={noticiaSeleccionada.urlToImage} alt={noticiaSeleccionada.title} />
          <a href={noticiaSeleccionada.url} target="_blank" rel="noopener noreferrer">Leer más</a>
          <p>{noticiaSeleccionada.content}</p>
          <p>Autor: {noticiaSeleccionada.author}</p>
          <p>Fecha: {noticiaSeleccionada.publishedAt}</p>
          <button onClick={cerrarNoticia}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default App;
