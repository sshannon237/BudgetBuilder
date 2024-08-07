const Error = ({error, resetErrorBoundary}) => {
  return (
    <div>
      <p>{error.message}</p>
      <input type="button" onClick={resetErrorBoundary} value="Try Again" />
    </div>
  )
}

export default Error
