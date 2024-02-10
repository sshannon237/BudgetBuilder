import Grid from "@mui/material/Unstable_Grid2"
import { 
	PropsWithChildren
} from "react"

function BasePage(props: PropsWithChildren) {

  return (
    <Grid container>
			<Grid xs={0} md={3}/>
			<Grid container xs={12} md={6}>
				{props.children}
			</Grid>
			<Grid xs={0} md={3}/>
    </Grid>
  )
}

export default BasePage
