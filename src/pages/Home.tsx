import useUserInfo from "../customHooks/useUserInfo"
import BasePage from "./BasePage"

function Home() {

  const {userInfo} = useUserInfo();

  return (
    <BasePage>
      <h2>Home</h2>
      <h4>Hello, {userInfo?.userDetails}</h4>
      <a href="/.auth/logout">Log out</a>
    </BasePage>
  )
}

export default Home
