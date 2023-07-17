import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../models/user";

@Injectable()
export class UserService {
  constructor(
    private http:HttpClient
  ) {}

  getUsers(configId: string):Observable<User[]> {
    return this.http.get<User[]>(`${environment.configurationServiceUrl}/User/GetAll?configId=${configId}`)
  }

  getUser(userId: string):Observable<User> {
    return this.http.get<User>(`${environment.configurationServiceUrl}/User/Get?id=${userId}`)
  }

  createUser(user:User) {
    return this.http.post(`${environment.configurationServiceUrl}/User`, user);
  }

  updateUser(userId:string, user:User) {
    return this.http.put<boolean>(`${environment.configurationServiceUrl}/User/${userId}`, user);
  }

  deleteUser(userId:string) {
    return this.http.delete<boolean>(`${environment.configurationServiceUrl}/User/${userId}`);
  }

}