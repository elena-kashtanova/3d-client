import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingMessage } from '../components/LoadingMessage';
import { Viewport } from '../components/Viewport';
import { getData } from '../utils/apiUtils';
import { ModelContext } from '../components/ModelContext';

function EditorPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/models/${id}`;

    getData(url)
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setData(null);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      <nav className="navbar editor-navbar">
        <NavLink end to="/models">
          Back
        </NavLink>
      </nav>
      {loading && <LoadingMessage />}
      {error && <ErrorMessage errorMessage={error} />}
      <ModelContext.Provider value={data}>
        {data && <Viewport />}
      </ModelContext.Provider>
    </div>
  );
}

export { EditorPage };
