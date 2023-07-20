import { AuthenticationService } from "src/app/_share/services/authentication.services";

export function appInitializer(authenticationservices: AuthenticationService){
    return ()=> new Promise((resolve:any) =>{
        authenticationservices.refreshToken()
        .subscribe()
        .add(resolve);
    })
}