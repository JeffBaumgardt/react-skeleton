import * as React from 'react'
import {Switch, Route} from 'react-router-dom'

const Routes = () => {
	return (
		<Switch>
			<Route exact path='/' component={() => <div>Hello World</div>} />
		</Switch>
	)
}

export default Routes
