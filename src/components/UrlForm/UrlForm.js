import React, { useState } from 'react';
import { postUrls } from '../../apiCalls';

function UrlForm({ addNewUrl, setUrls, urls}) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newUrl = {
      id: Date.now(),
      title: title,
      long_url: urlToShorten,

    }
    // addNewUrl(newUrl)
    postUrls(newUrl)
    .then(response => {
      setUrls([...urls, response])
      clearInputs();
    })
  }


  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <input
        type='text'
        placeholder='Title...'
        name='title'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <input
        type='text'
        placeholder='URL to Shorten...'
        name='urlToShorten'
        value={urlToShorten}
        onChange={e => setUrlToShorten(e.target.value)}
      />

      <button type='submit'>
        Shorten Please!
      </button>
    </form>
  )
}

export default UrlForm;
