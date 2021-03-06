import { IModelContext } from '../components/ModelContext';

async function getData(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    const message = `Something went wrong: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  return data;
}

async function updateModel(modelData: IModelContext) {
  const { id } = modelData;

  const url = `${process.env.REACT_APP_API_URL}/models/${id}`;
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(modelData),
  });

  if (!response.ok) {
    const message = `Something went wrong: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }

  return response;
}

async function deleteModel(id: string) {
  const url = `${process.env.REACT_APP_API_URL}/models/${id}`;
  const response = await fetch(url, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const message = `Something went wrong: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }

  return response;
}

export { getData, updateModel, deleteModel };
