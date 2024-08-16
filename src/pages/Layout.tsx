import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary";
import Error from "./Error";
import { Suspense } from "react";
import UserInfo from "../types/UserInfo";
import { getUserInfo, userInfoUrlEndpoint } from "../api/userInfoApi";
import useSWR from "swr";

const pages = ['Purchases', 'Customization'];

type ContextType = { userInfo: UserInfo | null}

function Layout() {

  const {
		data: userInfo,
	} = useSWR(userInfoUrlEndpoint, getUserInfo, {
		suspense: true
	});

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
