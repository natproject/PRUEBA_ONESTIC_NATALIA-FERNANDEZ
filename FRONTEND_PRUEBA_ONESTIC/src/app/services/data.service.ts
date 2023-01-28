import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from '../interfaces/response';
import { ResponseImages} from '../interfaces/responseImages';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  public url: string = "https://pokeapi.co/api/v2/pokemon/";

  public getResponse(offset: number, limit: number): Observable<Response> {
    return this.http.get<Response>(`${this.url}?offset=${offset}&limit=${limit}`);
  }

  public getDetail(name: string|null): Observable<ResponseImages> {
    return this.http.get<ResponseImages>(`${this.url}${name}`);
  }

  public getDetailById(id: number):Observable<ResponseImages> {
    return this.http.get<ResponseImages>(`${this.url}${id}`);
  }

  public getAll():Observable<Response> {
    return this.http.get<Response>(this.url);
  }
}
