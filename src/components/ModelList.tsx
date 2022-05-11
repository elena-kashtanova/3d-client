import { ModelListItem } from './ModelListItem';

function ModelList({ data }: { data: { id: string; name: string }[] }) {
  const models = data.map(({ id, name }: { id: string; name: string }) => (
    <ModelListItem key={id} id={id} name={name} />
  ));

  return <ul className="model-list">{models}</ul>;
}

export { ModelList };
