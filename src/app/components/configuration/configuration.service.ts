import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Configuration } from "src/app/models/configuration";
import { environment } from "src/environments/environment";

@Injectable()
export class ConfigurationService {
  constructor(
    private http:HttpClient
  ) {}

  getConfiguations():Observable<Configuration[]> {
    return this.http.get<Configuration[]>(`${environment.configurationServiceUrl}/Configuration/GetAll`)
  }

  getConfiguation(configId: string):Observable<Configuration> {
    return this.http.get<Configuration>(`${environment.configurationServiceUrl}/Configuration/Get?id=${configId}`)
  }

  createConfiguration(config:Configuration) {
    return this.http.post(`${environment.configurationServiceUrl}/Configuration`, config);
  }

  updateConfiguration(configId:string, config:Configuration) {
    return this.http.put<boolean>(`${environment.configurationServiceUrl}/Configuration/${configId}`, config);
  }

  deleteConfiguration(configId:string) {
    return this.http.delete<boolean>(`${environment.configurationServiceUrl}/Configuration/${configId}`);
  }

}