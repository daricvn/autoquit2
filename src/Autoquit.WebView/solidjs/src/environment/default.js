export const ENVIRONMENT = {
    HOST: 'http://requests',
    getUrl: (path)=>{
        return [ ENVIRONMENT.HOST, path ].join('/')
    }
}