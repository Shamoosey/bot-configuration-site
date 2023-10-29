import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "bot-configuration-types";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable()
export class UserService {
  constructor(
    private http:HttpClient
  ) {}

  getUsers(configId: string):Observable<User[]> {
    return this.http.get<User[]>(`${environment.configurationServiceUrl}/User/GetAll?configId=${configId}`)
  }

  getUser(userId: string):Observable<User> {
    return this.http.get<User>(`${environment.configurationServiceUrl}/User/Get?userId=${userId}`)
  }

  createUser(user:User, configId: string) {
    return this.http.post<boolean>(`${environment.configurationServiceUrl}/User?configId=${configId}`, user);
  }

  updateUser(userId:string, user:User) {
    return this.http.put<boolean>(`${environment.configurationServiceUrl}/User?userId=${userId}`, user);
  }

  deleteUser(userId:string) {
    return this.http.delete<boolean>(`${environment.configurationServiceUrl}/User/${userId}`);
  }
}