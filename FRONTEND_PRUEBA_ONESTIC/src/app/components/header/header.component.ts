import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public img: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png";
  //@Input() darkTheme: boolean = false;
  public darkTheme: boolean = false;
  public showGrid: number = 1;

  public darkMode(bool: boolean):void{
    this.darkTheme = bool;
  }

  public changeDisplay(num: number) {
    window.scrollTo(0, 0);
    this.showGrid = num;
  }

}
