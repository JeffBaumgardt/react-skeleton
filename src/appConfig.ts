export interface AppConfig {
    API_ROOT: string
}

if (!process.env || !process.env.REACT_APP_API_ROOT) {
    throw new Error('This react app requires the ENV key REACT_APP_API_ROOT to be present.')
}

export const API_ROOT = process.env.REACT_APP_API_ROOT || ''

export default {
    API_ROOT
}