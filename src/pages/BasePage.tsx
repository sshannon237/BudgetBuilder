import { 
	PropsWithChildren
} from "react"

function BasePage(props: PropsWithChildren) {

  return (
		<>
			{props.children}
		</>
  )
}

export default BasePage
