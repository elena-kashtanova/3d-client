async function getData(url: string) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }

  const data = await response.json();
  return data;
}

export { getData };
