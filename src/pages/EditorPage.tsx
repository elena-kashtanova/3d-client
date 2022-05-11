import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EditorNavbar } from '../components/EditorNavbar';
import { ErrorMessage } from '../components/ErrorMessage';
import { LoadingMessage } from '../components/LoadingMessage';
import { ResultMessage } from '../components/ResultMessage';
import { Viewport } from '../components/Viewport';
import { Form } from '../components/Form';
import { getData, updateModel, deleteModel } from '../utils/apiUtils';
import { IModelContext, ModelContext } from '../components/ModelContext';

function EditorPage() {
  const [data, setData] = useState<IModelContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { id } = useParams();

  const navigate = useNavigate();

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

  const saveChangedData = (updatedData: IModelContext): void => {
    setData(updatedData);
  };

  const handleTransform = (updateData: Partial<IModelContext>): void => {
    const newData = Object.assign({}, data, updateData);
    setData(newData);
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setMessage('Saving...');

    if (data) {
      try {
        const res = await updateModel(data);

        if (res.status === 200) {
          setMessage('Model updated successfully');
          setTimeout(() => {
            setMessage(null);
          }, 2500);
        } else {
          throw new Error(res.statusText);
        }
      } catch (error) {
        setMessage(null);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      }
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): Promise<void> => {
    e.preventDefault();
    setMessage('Deleting...');

    const id = data?.id;

    if (id) {
      try {
        const res = await deleteModel(id);

        if (res.status === 200) {
          setMessage('Model deleted successfully');
          setTimeout(() => {
            setMessage(null);
          }, 2500);
          navigate('/models');
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
      <EditorNavbar />
      {message && <ResultMessage text={message} />}
      {loading && <LoadingMessage />}
      {error && <ErrorMessage errorMessage={error} />}
      <ModelContext.Provider value={data}>
        {data && <Viewport handleTransform={handleTransform} />}
        {data && (
          <Form
            handleDelete={handleDelete}
            handleSubmit={handleSubmit}
            saveChangedData={saveChangedData}
          />
        )}
      </ModelContext.Provider>
    </div>
  );
}

export { EditorPage };
