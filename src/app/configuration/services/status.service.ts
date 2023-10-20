import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Status } from "../models/status";

@Injectable()
export class StatusService {
  constructor(
    private http:HttpClient
  ) {}

  getStatuses(configId: string):Observable<Status[]> {
    return this.http.get<Status[]>(`${environment.configurationServiceUrl}/Status/GetAll/${configId}`)
  }

  getStatus(statusId: string):Observable<Status> {
    return this.http.get<Status>(`${environment.configurationServiceUrl}/Status/Get?id=${statusId}`)
  }

  createStatus(status:Status) {
    return this.http.post(`${environment.configurationServiceUrl}/Status`, status);
  }

  updateStatus(statusId:string, status:Status) {
    return this.http.put<boolean>(`${environment.configurationServiceUrl}/Status/${statusId}`, status);
  }

  deleteStatus(statusId:string) {
    return this.http.delete<boolean>(`${environment.configurationServiceUrl}/Status/${statusId}`);
  }

}