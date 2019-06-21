import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserRoleData } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<UserRoleData[]>(`/users`);
    }

    getById(id: number) {
        return this.http.get<UserRoleData>(`/users/${id}`);
    }
}