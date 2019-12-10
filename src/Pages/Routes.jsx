import * as React from 'react'
import { Switch, Route } from 'react-router-dom'
import Screen1 from 'Pages/Screen1'

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={() => <div>Hello World</div>} />
			<Route exact path='/screen1' component={Screen1} />
		</Switch>
	)
}

export default Routes
