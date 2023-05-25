import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string = '2teXbJWWL4ONtY3RFKcPnFXudqh4LL8V';
  private servicioUrl:string = 'https://api.giphy.com/v1/gifs';
  private _historial:string[]=[];
  public resultados:Gif[]=[];

  historial():string[]{
    return [...this._historial];
  }


  constructor(private http: HttpClient) {
    //esta llinea se coloca en el constructor porque solo se ejecuta una sola vez
    //cuando se crea el objeto del service
    //con el operador ! le decimos a typescript que no se preocupe por si regresa null ya que estamos manejando
    //ese escenario creando un array [] vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //otra forma seria asi en 3 lineas
    /*  if(localStorage.getItem('historial')){
        this._historial = JSON.parse(localStorage.getItem('historial')!);
      } */
    this.buscarGifs((localStorage.getItem('lastSearch')!) || '')
    
   }

  buscarGifs(query:string = ''):void{
      query=query.trim().toLocaleLowerCase();
      
      if(!this._historial.includes(query) && query!=''){
        this._historial.unshift(query);
        this._historial= this._historial.splice(0,10);
        //console.log(this._historial);
        localStorage.setItem('historial', JSON.stringify(this._historial));
        localStorage.setItem('lastSearch',query);
      }

      //const headers = new HttpHeaders().set('token','test');
      //si una variable tiene el mismo nombre que una propiedad en un objeto se puede remover
      //por eso se envia params y no params:params
      const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('q',query)
      .set('limit','10');

      this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{/* headers: headers , */params})
          .subscribe((resp) => {
            //console.log(resp.data);
            this.resultados=resp.data;
          });
  }

}

