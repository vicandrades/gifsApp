import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
 
  historial(){
    return this.gifsService.historial;
  }

  constructor(private gifsService:GifsService) { }
  
  buscar(query:string):void{
    if(query)
      this.gifsService.buscarGifs(query);
  }

}
