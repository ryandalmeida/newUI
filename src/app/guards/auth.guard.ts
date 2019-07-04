import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { UserRoleService } from '../services/userRole.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
    roleRoutes = [];

    constructor(private router: Router, private adalSvc: MsAdalAngular6Service, private userRoleService: UserRoleService) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (this.adalSvc.isAuthenticated) {
            const roleObj = <any>await this.userRoleService.getRole();
            console.log("auth guard roleObj", roleObj)

            if (roleObj.includes("ROLE_WBG USER")) {
                this.roleRoutes.push("/approver");
            }
            if (roleObj.includes("ROLE_DONOR")) {
                this.roleRoutes.push("/");
            }
            if (roleObj.includes("ROLE_TREASURY")) {
                this.roleRoutes.push("/treasury");
            }

            let url = localStorage.getItem('stateURL');
            if (this.roleRoutes.includes(url)) {
                this.router.navigateByUrl(url);
                localStorage.removeItem('stateURL');
                return false;
            }
            return true;
        }
        this.adalSvc.login();
        localStorage.setItem('stateURL', state.url);
        return false;
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(childRoute, state);
    }

}






