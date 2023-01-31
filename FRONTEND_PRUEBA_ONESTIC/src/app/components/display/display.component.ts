import { Component } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  public img: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png";
  public darkTheme: boolean = false;
  public showGrid: number = 1;
  public display: number = 1;
  public disabledButton: boolean = false;
  public pokemonNameDetail: string = "";

  public darkMode(bool: boolean):void{
    this.darkTheme = bool;
  }

  public changeDisplay(num: number): void{
    this.showGrid = num;
  }

  public showInfoDetail(name: string): void{
    this.disabledButton = true;
    this.pokemonNameDetail = name;
    this.display = 2;
  }

  public showAll(): void{
    this.disabledButton = false;
    this.display = 1;
    this.pokemonNameDetail = "";
  }

  public next(name: string): void {
    this.pokemonNameDetail = name;
  }

  public previous(name: string): void {
    this.pokemonNameDetail = name;
  }

  public showFavs(display: number): void{
    this.display = 3;
    this.disabledButton = true;
  }
}
