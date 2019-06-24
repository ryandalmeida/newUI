import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate,CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import{UserRoleService} from '../services/userRole.service'
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Injectable({ providedIn: 'root' })
export class AuthGuard {

    roleRoutes = {
        "WBG USER": "/approver",
        "DONOR":"/"
    };
    

    constructor(private adalSvc: MsAdalAngular6Service, private router: Router,private userRoleService: UserRoleService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const roleObj = {"role":[
            'WBG USER',
            'DONOR'
            ]} 
        // const roleObj = <any>await this.userRoleService.getRole();
        // console.log("auth guard roleObj",roleObj)

        if(this.adalSvc.isAuthenticated) {
            let roleRoute = localStorage.getItem('roleRoute');

            if(roleRoute && roleRoute != state.url) {
                this.router.navigateByUrl(roleRoute);
				 localStorage.removeItem('roleRoute');
                return false;
            }
            return true;
        }
        this.adalSvc.login();
        localStorage.setItem('roleRoute', this.roleRoutes[roleObj.role[0]]);
        return false;
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(childRoute, state);
    }

}






