This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Layout
This project has a slightly opinionated layout.

### Components

All generic purpose, multiuse components will live here. These include wrappers, hoc's, or anything else that does not relate to a specific page.

### Pages

All page components. These are very likely to also be found as routes in `routes.jsx`. They are pages/routes in your app.

### lib

Library files that are used in the entirity of the project, such as auth, api, redux and so on.<br />These are imported via `import "" from 'lib/...`

### context

Context files are wrapping the entire project. These contexts are providers for the entire project, such as Router, Redux, Auth and Theme.<br />For instance you can use the auth context in a component by accessing the auth context
```js
import useAuth from 'context/auth'

const logoutButton = () => {
	const {logout} = useAuth()

	return <button onClick={logout}>Logout</button>
}
```

### styles

The styles directory. This would be where you would import you css files or make generic jss functions for the entire app
```js
import {makeStyles} from '@material-ui/core/styles'

export function useGlobalStyles = makeStyles(theme => ({
	defaultMargin: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2)
	}
}))
```
More information about [makeStyles hook](https://material-ui.com/styles/api/#makestyles-styles-options-hook).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open [http://localhost:3000](http://localhost:3000) to view it in the
browser.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run lint`

Lints the project files using configs found in `.eslintrc/js`

### `yarn build`

Builds the app for production to the `build` folder.<br /> It correctly bundles React in production mode and optimizes
the build for the best performance.

The build is minified and the filenames include the hashes.<br /> Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: This script was intentionally removed if you absolutly need to eject run the bin directly**

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
