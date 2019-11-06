export interface AppConfig {
    API_ROOT: string
    APP_NAME: string
}

export const API_ROOT = process.env.REACT_APP_API_ROOT || ''

export const APP_NAME = process.env.REACT_APP_APP_NAME || '' // Application name goes here. This is just used as a key for project scoping

export default {
    API_ROOT,
    APP_NAME,
}
