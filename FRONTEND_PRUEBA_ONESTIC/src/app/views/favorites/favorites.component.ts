import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  @Input() darkTheme: boolean = false;
  @Input() showGrid: number = 0;
  @Output() showDetail = new EventEmitter<string>();
  public namesFav: string[] = [];
  public imgFav: string[] = [];
  public totalFavs: number = 0;
  public values: { name: string, img: string }[] = []
  public arrayFavs: any[][] = []

  constructor(public service: DataService) {
  }

  ngOnInit() {
    this.getFavorites();
  }

  public getFavorites(): void {
    window.scrollTo(0, 0);
    let names = Object.keys(localStorage);
    names.forEach(name => {
      if (!name.endsWith(".img") && !name.endsWith("mode")) {
        this.namesFav.push(name);
      }
    });
    for (let i = 0; i < this.namesFav.length; i++) {
      let value = localStorage.getItem(this.namesFav[i] + '.img')
      if (value !== null) {
        this.imgFav.push(value)
      }
    }
    this.totalFavs = this.namesFav.length;
    for (let i = 0; i < this.namesFav.length; i++) {
      this.values.push({ name: this.namesFav[i], img: this.imgFav[i] })
    }
    this.arrayFavs = [];
    let currentRow = 0;
    for (let i = 0; i < this.values.length; i++) {
      if (i % 4 === 0) {
        this.arrayFavs[currentRow] = [];
        currentRow++;
      }
      this.arrayFavs[currentRow - 1].push(this.values[i]);
    }

  }

  public delete(name: string, img: string): void {
    if (localStorage.getItem(name)) {
      localStorage.removeItem(name);
    } else {
      localStorage.setItem(name, name);
    }
    if (localStorage.getItem(name + ".img")) {
      localStorage.removeItem(name + ".img");
    } else {
      localStorage.setItem(name + '.img', img);
    }
  }

  public showInfoDetail(name: string) {
    this.showDetail.emit(name);
  }

}
