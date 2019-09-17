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
            
            if (roleObj.includes("APPROVER")) {
                this.roleRoutes.push("/approver");
            }
            if (roleObj.includes("DONOR")) {
                this.roleRoutes.push("/");
            }
            if (roleObj.includes("TREASURY")) {
                this.roleRoutes.push("/treasury");
            }
            if (roleObj.includes("ADMIN")) {
                this.roleRoutes.push("/admin");
            }

            let url = sessionStorage.getItem('stateURL');
            console.log("url",url)
            if (this.roleRoutes.includes(url)) {
                this.router.navigateByUrl(url);
                sessionStorage.removeItem('stateURL');
                return false;
            }
            return true;
        }
        this.adalSvc.login();
        sessionStorage.setItem('stateURL', state.url);
        return false;
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.canActivate(childRoute, state);
    }

}






