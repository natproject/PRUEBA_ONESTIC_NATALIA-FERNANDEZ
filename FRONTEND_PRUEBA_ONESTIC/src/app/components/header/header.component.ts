import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
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
    window.scrollTo(0, 0);
    this.showGrid = num;
  }

  public showInfoDetail(name: string): void{
    this.disabledButton = true;
    this.display = 2;
    this.pokemonNameDetail = name;
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
}
