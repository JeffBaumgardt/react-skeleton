This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Layout

This project has a slightly opinionated layout.

### Components

All generic purpose, multiuse components will live here. These include wrappers, hoc's, or anything else that does not
relate to a specific page.

### Pages

All page components. These are very likely to also be found as routes in `routes.jsx`. They are pages/routes in your
app.

### lib

Library files that are used in the entirity of the project, such as auth, api, redux and so on.<br />These are imported
via `import "" from 'lib/...`

### context

Context files are wrapping the entire project. These contexts are providers for the entire project, such as Router,
Redux, Auth and Theme.<br />For instance you can use the auth context in a component by accessing the auth context

```js
import useAuth from 'context/auth'

const logoutButton = () => {
    const {logout} = useAuth()

    return <button onClick={logout}>Logout</button>
}
```

### styles

The styles directory. This would be where you would import you css files or make generic jss functions for the entire
app

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

## Project configuration

The project has several configs for various tasks. From enviromental flags to lint configs I'll try to explain what each
is for and how to use them.

### `.eslintrc.js`

Project wide lint rules can be found here. For more information about rules please see
[eslint's documentation](https://eslint.org/docs/user-guide/configuring)

### `.prettierrc`

Prettier formats you code (usually on save, check your editor for settings). This makes code uniform between commits and
other developers. Making it easier to read and understand code without formatting getting in the way. More infomation at
[prettier docs](https://prettier.io/docs/en/index.html)

### `jsconfig.json`

This config file is for the editor and bundler to find and execute your code correctly. Most used is the relative
imports by selecting a baseURL reference. So instead of an import looking like
`import Foo from '../../../../../Components/Foo'` it can look like `import Foo from 'Components/Foo'` This file most
likely will never need to be updated. Details about jsconfig.json
[can be found here](https://code.visualstudio.com/docs/languages/jsconfig)

### `.env-cmdrc`

The enviroment config file is needed for an flags that will be enviroment specific, like an api endpoint. In this file
we have sections to breakdown each enviroment, development, staging, production and so on. To use any flag in the app,
the flag must be preffeced with `REACT_APP` ie `REACT_APP_API_ROOT`. Only flags that begin with the react app will be
exposed to the running project.

### `src/appConfig.js`

This is the internal flags config. This reads the env flags at server startup or are built at build time. This is the
best place to store the env flags that your app will use vs trying to inspect `process.env.REACT_APP_SOME_FLAG` multiple
times in the project.

### `src/setupTests.js`

The setup tests are a reference to jest's setupFileAfterEnv option. This file is executed before all test files. This is
the best place to include any global imports like `jest-dom` or mocks. For create-react-app specific infomation please
[refer to the docs](https://create-react-app.dev/docs/running-tests/)

## Options not considered but documented

### Sass precompiled stylesheets

I've never had to use sass before in any project. Material-UI, which is already included with this project, is built to
use CSS-in-JS syntax. Please refer to their docs for useage. However, if you wish to use sass for precompiled style
sheets please [see Adding a Sass Stylesheet](https://create-react-app.dev/docs/adding-a-sass-stylesheet/) in the docs.

### Translations

Translations are very platform specific and thus picking one product to use would be very difficult. Depending on how
your translations are stored, via api calls or json files there are various ways to implement translations. One personal
recommendation I can make would be [react-intl](https://github.com/formatjs/react-intl) or
[react-i18next](https://github.com/i18next/react-i18next)

### API

API's are generally very specific per project. From multiple end-points to authentication, methods can be very
different. I recommend learning [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) directly for the
most flexable option or if you prefer something a little more out of the box you can check out
[Axios](https://github.com/axios/axios)

## Authentication

Just like the API authentication can vary depending on how the authentication is being implemented from the api. The
most common authentication patters are cookies and JSON Web Tokens (JWT). The implementation of even these two are very
different from each other. And as such this skeleton cannot pick a specific tools for use. For a good reading
recomendation reguarding autentication please refer to
[React Tutorial: Building and Securing Your First App - Auth0](https://auth0.com/blog/react-tutorial-building-and-securing-your-first-app/)

## Caching

Out of the box the built app automatically is cache busted by a hashed filename output. This is done by webpack
internally and nothing needs to be done in code for this to happen. A different example of caching might be considered
code-splitting; where you define points in the code that a new file is generated for the new code. This reduces the
amount of code that is sent over the network at any one point in time and also reduces parsing time of the js in
browser, due to being a smaller bundle. See React's own [documentation](https://reactjs.org/docs/code-splitting.html)
for examples in code-splitting

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
