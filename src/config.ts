export interface AppConfig {
    API_ROOT: string
}

console.log(process.env)

export const API_ROOT = process.env.REACT_APP_API_ROOT || ''

export default {
    API_ROOT
}