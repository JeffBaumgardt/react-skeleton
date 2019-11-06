import * as React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

const Routes: React.FC = () => {
	return (
		<Switch>
			<Route exact path='/' component={() => <div>Hello World</div>} />
		</Switch>
	)
}

export default Routes
