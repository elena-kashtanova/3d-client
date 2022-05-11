import { useEffect, useState } from 'react';
import { ModelList } from '../components/ModelList';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingMessage } from '../components/LoadingMessage';
import { getData } from '../utils/apiUtils';

function ModelLibraryPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/models`;

    getData(url)
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
      {loading && <LoadingMessage />}
      {error && <ErrorMessage errorMessage={error} />}
      {data && <ModelList data={data} />}
    </main>
  );
}

export { ModelLibraryPage };
