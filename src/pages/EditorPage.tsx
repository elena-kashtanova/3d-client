import { useParams, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingMessage } from '../components/LoadingMessage';
import { ResultMessage } from '../components/ResultMessage';
import { Viewport } from '../components/Viewport';
import { getData, updateModel } from '../utils/apiUtils';
import { IModelContext, ModelContext } from '../components/ModelContext';

function EditorPage() {
  const [data, setData] = useState<IModelContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name;
    let value;

    if (key === 'color') {
      value = e.target.value.replace('#', '0x');
    }

    const updatedData = Object.assign({}, data, { [key]: value });
    setData(updatedData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('Saving...');

    if (data) {
      try {
        const res = await updateModel(data);

        console.log(res.status);
        if (res.status === 200) {
          setMessage('Model updated successfully');
          setTimeout(() => {
            setMessage(null);
          }, 2500);
        } else {
          throw new Error(res.statusText);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      }
    }
  };

  return (
    <div className="app">
      <nav className="navbar editor-navbar">
        <NavLink end to="/models">
          Back
        </NavLink>
      </nav>
      {message && <ResultMessage text={message} />}
      {loading && <LoadingMessage />}
      {error && <ErrorMessage errorMessage={error} />}
      <ModelContext.Provider value={data}>
        {data && <Viewport />}
        {data && (
          <form
            className="editor-form"
            method="PUT"
            action={`${process.env.REACT_APP_API_URL}/models/${id}`}
            onSubmit={handleSubmit}
          >
            <label>
              Color:
              <input
                type="color"
                name="color"
                value={data.color.replace('0x', '#')}
                onChange={handleChange}
              ></input>
            </label>
            <button type="submit" className="submit">
              Submit
            </button>
            <button type="button" className="delete">
              Delete Model
            </button>
          </form>
        )}
      </ModelContext.Provider>
    </div>
  );
}

export { EditorPage };
