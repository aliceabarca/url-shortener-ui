import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls, postUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {

  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('')
  
    const addNewUrl = (newUrl) => {
      postUrls(newUrl).then(data => console.log(data))
      setUrls([...urls, newUrl])
    }

  useEffect(() => {
    getUrls()
      .then(data => {
        setUrls(data.urls)
      })
      .catch(error => {
        setError(error)
      })
  }, [])

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addNewUrl={addNewUrl} urls={urls} setUrls={setUrls}/>
      </header>

      <UrlContainer urls={urls}/>
    </main>
  );
}

export default App;
