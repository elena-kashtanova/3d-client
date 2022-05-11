import { useContext } from 'react';
import { IModelContext, ModelContext } from './ModelContext';

interface Props {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  saveChangedData: (updateData: IModelContext) => void;
  handleDelete: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => Promise<void>;
}

function Form({ handleSubmit, saveChangedData, handleDelete }: Props) {
  const data = useContext(ModelContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const key = e.target.name;
    let value;

    if (key === 'color') {
      value = e.target.value.replace('#', '0x');
    }

    const updatedData = Object.assign({}, data, { [key]: value });
    saveChangedData(updatedData);
  };

  return (
    <form
      className="editor-form"
      method="PUT"
      action={`${process.env.REACT_APP_API_URL}/models/${data?.id}`}
      onSubmit={handleSubmit}
    >
      <label>
        Color:
        <input
          type="color"
          name="color"
          value={data?.color.replace('0x', '#')}
          onChange={handleInputChange}
        ></input>
      </label>
      <button type="submit" className="submit">
        Save
      </button>
      <button type="button" className="delete" onClick={handleDelete}>
        Delete Model
      </button>
    </form>
  );
}

export { Form };
