import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Fib() {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    // fetchIndexes();
    fetchValues();
  }, []);

  async function fetchValues() {
    const values = await axios.get('/api/values/current');
    setValues(values.data);
  }

  async function fetchIndexes() {
    const indexes = await axios.get('/api/values/all');
    setSeenIndexes(indexes.data);
  }

  function renderSeenIndexes() {
    return seenIndexes.map(({ number }) => number).join(', ');
  }

  function renderValues() {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} i calculated {values[key]}
        </div>
      );
    }

    return entries;
    // console.log(entries);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post('/api/values', {
      index: index
    });

    setIndex('');
  }

  return (
    <div>
      <form onSubmit={e => handleSubmit(e)}>
        <input value={index} onChange={e => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>
      <h3>Indexes i have seen :</h3>
      {renderSeenIndexes()}
      <h3>Calulated values :</h3>
      {renderValues()}
    </div>
  );
}
