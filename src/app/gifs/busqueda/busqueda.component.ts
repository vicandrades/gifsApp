import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar')
  txtBuscar!: ElementRef<HTMLInputElement>;//el ! sirve para decirle a typescript que el valor de ese elemento no sera nulo nunca
  
  constructor(private gifsService:GifsService){

  }
  //buscar(texto:string){
  buscar(){
    //console.log(texto);
    const valor:string = this.txtBuscar.nativeElement.value;
    //console.log(valor);
    if(valor.trim().length === 0){ return;}
     
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value='';
  }

}
