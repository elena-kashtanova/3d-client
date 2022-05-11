import { Link } from 'react-router-dom';

function ModelListItem({ id, name }: { id: string; name: string }) {
  return (
    <li className="model" key={id}>
      <Link to={`/models/${id}`} className="model-link">
        {name}
      </Link>
    </li>
  );
}

export { ModelListItem };
