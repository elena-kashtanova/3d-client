function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return <h1>{`Something went wrong: ${errorMessage}`}</h1>;
}

export { ErrorMessage };
