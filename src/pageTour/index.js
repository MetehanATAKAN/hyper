import { authProtectedFlattenRoutes } from '../routes/index';

export const pageSteps =(path)=> {
    let pageName=null;
     authProtectedFlattenRoutes.map(routes=>(
         routes.path === path
         ? pageName=routes.name
         :null
     ))
    return pageName;
}