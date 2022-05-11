function ErrorMessage({ errorMessage }: { errorMessage: string }) {
  return (
    <p className="error-message">{`Something went wrong: ${errorMessage}`}</p>
  );
}

export { ErrorMessage };
