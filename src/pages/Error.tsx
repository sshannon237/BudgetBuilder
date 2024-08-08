/* eslint-disable @typescript-eslint/no-explicit-any */
const Error = ({error, resetErrorBoundary}: {error:any, resetErrorBoundary:any}) => {
  return (
    <div>
      <p>{error.message}</p>
      <input type="button" onClick={resetErrorBoundary} value="Try Again" />
    </div>
  )
}

export default Error
