import { ModelListItem } from './ModelListItem';

function ModelList() {
  const data = [
    { id: '1', name: 'Cube' },
    { id: '2', name: 'Sphere' },
    { id: '3', name: 'Cone' },
  ];

  const models = data.map(({ id, name }: { id: string; name: string }) => (
    <ModelListItem id={id} name={name} />
  ));

  return <ul className="model-list">{models}</ul>;
}

export { ModelList };
