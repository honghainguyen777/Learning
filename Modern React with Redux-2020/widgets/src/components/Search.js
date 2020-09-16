import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [results, setResults] = useState([]);

  // anytime user change/type the input, execute the below
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  // anytime the debouncedTerm change as in the timerId function above
  // the below is executed
  // moreover, whenever the component is initially re-rendered, the below excecuted
  useEffect(() => {
    const search = async () => {
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
        params: {
          action: 'query',
          list: 'search',
          origin: '*',
          format: 'json',
          srsearch: debouncedTerm,
        },
      });

      setResults(data.query.search);
    };
    search();
  }, [debouncedTerm]);

  // old code before solving “missing dependency ‘results.length" problem
  // useEffect(() => {
  //   // we can use a temp varible for async method
  //   const search = async () => {
  //     const {data} = await axios.get('https://en.wikipedia.org/w/api.php', {
  //       params: {
  //         action: 'query',
  //         list: 'search',
  //         origin: '*',
  //         format: 'json',
  //         srsearch: term
  //       },
  //     });
  //
  //     setResults(data.query.search);
  //   };
  //
  //   if (term && !results.length) {
  //     search();
  //   } else {
  //     const timeoutId = setTimeout(() => {
  //       if (term) {
  //         search();
  //       }
  //     }, 1000);
  //
  //     return () => {
  //       clearTimeout(timeoutId);
  //     };
  //   }

    // or using invoked function
    // (async () => {
    //   await axios.get('sdsdsds');
    // })();

    // or
    // axios.get('sdsads')
    //   .then((response) => {
    //     console.log(response.data);
    //   });

  // }, [term, results.length]);

  // because the result.snippet in wikipedia return a string contains html element like span
  // we can use <span dangerouslySetInnerHTML={{ __html: result.snippet}}></span>
  // but this will make the app expose to be attached from hackers
  // if we trust the source of the response data? then use it (ask: do you trust wikipedia in this case?)
  const renderedResults = results.map((result) => {
    return (
      <div key={result.pageid} className="item">
        <div className="right floated content">
          <a
            className="ui button"
            href={`https://en.wikipedia.org?curid=${result.pageid}`}
          >
            Go
          </a>
        </div>
        <div className="content">
          <div className="header">
            {result.title}
          </div>
          <span dangerouslySetInnerHTML={{ __html: result.snippet }}></span>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <label>Enter Search Term</label>
          <input
            value={term}
            onChange={e => setTerm(e.target.value)}
            className="input" />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  );
};

export default Search;
