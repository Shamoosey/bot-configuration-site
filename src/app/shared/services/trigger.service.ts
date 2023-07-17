import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Trigger } from "../models/trigger";

@Injectable()
export class TriggerService {
  constructor(
    private http:HttpClient
  ) {}

  getTriggers(configId: string):Observable<Trigger[]> {
    return this.http.get<Trigger[]>(`${environment.configurationServiceUrl}/Trigger/GetAll?configId=${configId}`)
  }

  getTrigger(triggerId: string):Observable<Trigger> {
    return this.http.get<Trigger>(`${environment.configurationServiceUrl}/Trigger/Get?id=${triggerId}`)
  }

  createTrigger(trigger:Trigger) {
    return this.http.post(`${environment.configurationServiceUrl}/Trigger`, trigger);
  }

  updateTrigger(triggerId:string, trigger:Trigger) {
    return this.http.put<boolean>(`${environment.configurationServiceUrl}/Trigger/${triggerId}`, trigger);
  }

  deleteTrigger(triggerId:string) {
    return this.http.delete<boolean>(`${environment.configurationServiceUrl}/Trigger/${triggerId}`);
  }

}