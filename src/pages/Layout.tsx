import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary";
import Error from "./Error";
import { Suspense, useEffect, useState } from "react";
import UserInfo from "../types/UserInfo";

const pages = ['Purchases', 'Customization'];

type ContextType = { userInfo: UserInfo | null}

function Layout() {

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    ( async () => {
      setUserInfo(await getUserInfo());
    })();
  }, []);

  //TODO move to api folder?
  const getUserInfo = async () => {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch ( error ) {
      console.error(error);
    }
  }

  const navigate = useNavigate();
  const location = useLocation();

  // TODO: Make these nicer
  const Loading = <h1>Loading...</h1>

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

      <ErrorBoundary 
        FallbackComponent={Error}
        onReset={()=>navigate(location.pathname)}
        resetKeys={[location.pathname]}
        >
        <Suspense fallback={Loading}>
          <Outlet context={{ userInfo } satisfies ContextType} />
        </Suspense>
      </ErrorBoundary>  
    </>
  )
}

export default Layout
