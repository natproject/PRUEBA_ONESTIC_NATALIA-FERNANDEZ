import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  public display: number = 0;
  public namesFav: string[] = [];
  public imgFav: string[] = [];
  public totalFavs: number = 0;
  public values: { name: string, img: string }[] = []
  public arrayFavs: any[][] = []
  //public darkTheme: boolean = false;

  constructor(private route: ActivatedRoute, public service: DataService, private router: Router) {
  }

  ngOnInit() {
    this.getFavorites();
  }

  public getFavorites(): void {
    window.scrollTo(0, 0);
   // (localStorage.getItem('mode') === 'true') ? this.darkTheme = true : this.darkTheme = false;
    let name = this.route.snapshot.paramMap.get('type');
    switch (name) {
      case 'grid':
        this.display = 1;
        break;

      case 'list':
        this.display = 2;
        break;
    }
   /* let dark = this.route.snapshot.paramMap.get('dark');
    switch (dark) {
      case 'true':
        this.darkTheme = true;
        break;

      case 'false':
        this.darkTheme = false;
        break;
    }*/
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

  /*public darkMode(): void {
    if (localStorage.getItem('mode') === 'true') {
      this.darkTheme = false;
      localStorage.setItem('mode', 'false');
    } else {
      this.darkTheme = true;
      localStorage.setItem('mode', 'true');
    }
  }*/

}
