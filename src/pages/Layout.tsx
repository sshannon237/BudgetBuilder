import { Link, Outlet } from "react-router-dom"
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const pages = ['Purchases', 'Customization'];

function Layout() {

  // TODO: Make these nicer
  const Loading = <h1>Loading...</h1>
  const Error = <h1>Error!</h1>

  return (
    <>
      <h1>Budget Builder</h1>
      
      <ul>
        <li>
          <Link to={"/"}>
            Home
          </Link>
        </li>

        {pages.map((page) => (
          <li key={page}>
            <Link
              to={"/" + page.toLocaleLowerCase()}>
              {page}
            </Link> 
          </li>
        ))}
      </ul>

      <ErrorBoundary fallback={Error}>
        <Suspense fallback={Loading}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default Layout
