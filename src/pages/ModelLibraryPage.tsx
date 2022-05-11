import { useEffect, useState } from 'react';
import { ModelList } from '../components/ModelList';

function ModelLibraryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/models`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main className="content">
      {loading && <p>Loading...</p>}
      {error && <h1>{`Something went wrongs - ${error}`}</h1>}
      {data && <ModelList data={data} />}
    </main>
  );
}

export { ModelLibraryPage };
