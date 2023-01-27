import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response';7
import { ResponseImages} from '../interfaces/responseImages';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public url: string = "https://pokeapi.co/api/v2/pokemon";

  public getResponse(): Observable<Response> {
    return this.http.get<Response>(this.url)
  }

}
