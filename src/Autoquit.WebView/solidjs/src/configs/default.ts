export const ENVIRONMENT = {
    HOST: 'http://requests',
    getUrl: (path: string)=>{
        return [ ENVIRONMENT.HOST, path ].join('/')
    }
}