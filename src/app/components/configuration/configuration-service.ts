import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/models/configuration";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ConfigurationService {
  constructor(
    private http:HttpClient
  ) {}

  getConfiguations():Observable<Configuration[]> {
    return this.http.get<Configuration[]>(`${environment.configurationServiceUrl}/Configuration/GetAll`)
  }

}