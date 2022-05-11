function ModelListItem({ id, name }: { id: string; name: string }) {
  return (
    <li className="model" key={id}>
      {name}
    </li>
  );
}

export { ModelListItem };
