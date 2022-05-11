import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingMessage } from '../components/LoadingMessage';
import { getData } from '../utils/apiUtils';

function EditorPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/models/${id}`;

    getData(url)
      .then((data) => {
        console.log(data);
        setError(null);
      })
      .catch((err) => {
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
    </div>
  );
}

export { EditorPage };
