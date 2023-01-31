import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public pokemons = [];
  public counter: number = 0;
  public pokemonsName: string[] = [];
  public pokemonsUrl: string[] = [];
  public pokemonsImg: string[] = [];
  public arrayPokemons: { img: string, namePokemon: string, fav: boolean }[][] = [[{ img: '', namePokemon: '', fav: false }]];
  public pokemonsId: string[] = [];
  public isFav: boolean[] = [];
  @Input() darkTheme: boolean = false;
  @Input() showGrid: number = 1;
  public pageIndex: number = 0;
  public totalPokemons = 0;
  public totalPages = 0;
  public pokemonsPerPage = 20

  constructor(public service: DataService) { }

  ngOnInit() {
    this.start(0);
  }

  public start(pageIndex: number) {
    console.log(pageIndex)
    window.scrollTo(0, 0);
    this.pokemonsUrl = [];
    this.pokemonsName = [];
    this.pokemonsImg = [];
    this.isFav = [];
    this.service.getResponse(pageIndex * this.pokemonsPerPage, this.pokemonsPerPage).subscribe(response => {
      this.counter = response.results.length;
      this.totalPokemons = response.count;
      this.totalPages = 63;
      for (let i = 0; i < this.counter; i++) {
        this.pokemonsName.push(response.results[i].name);
        this.pokemonsUrl.push(response.results[i].url)
      }
      for (let i = 0; i < this.pokemonsUrl.length; i++) {
        let image = this.pokemonsUrl[i].split("/");
        this.pokemonsId.push(image[6]);
        this.pokemonsImg.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${image[6]}.png`);
      }
      for (let i = 0; i < this.pokemonsName.length; i++) {
        if (this.pokemonsName[i] === localStorage.getItem(this.pokemonsName[i])) {
          this.isFav.push(true)
        } else {
          this.isFav.push(false)
        }
      }
      this.arrayPokemons = [
        [{ img: this.pokemonsImg[0], namePokemon: this.pokemonsName[0], fav: this.isFav[0] }, { img: this.pokemonsImg[1], namePokemon: this.pokemonsName[1], fav: this.isFav[1] }, { img: this.pokemonsImg[2], namePokemon: this.pokemonsName[2], fav: this.isFav[2] }, { img: this.pokemonsImg[3], namePokemon: this.pokemonsName[3], fav: this.isFav[3] }],
        [{ img: this.pokemonsImg[4], namePokemon: this.pokemonsName[4], fav: this.isFav[4] }, { img: this.pokemonsImg[5], namePokemon: this.pokemonsName[5], fav: this.isFav[5] }, { img: this.pokemonsImg[6], namePokemon: this.pokemonsName[6], fav: this.isFav[6] }, { img: this.pokemonsImg[7], namePokemon: this.pokemonsName[7], fav: this.isFav[7] }],
        [{ img: this.pokemonsImg[8], namePokemon: this.pokemonsName[8], fav: this.isFav[8] }, { img: this.pokemonsImg[9], namePokemon: this.pokemonsName[9], fav: this.isFav[9] }, { img: this.pokemonsImg[10], namePokemon: this.pokemonsName[10], fav: this.isFav[10] }, { img: this.pokemonsImg[11], namePokemon: this.pokemonsName[11], fav: this.isFav[11] }],
        [{ img: this.pokemonsImg[12], namePokemon: this.pokemonsName[12], fav: this.isFav[12] }, { img: this.pokemonsImg[13], namePokemon: this.pokemonsName[13], fav: this.isFav[13] }, { img: this.pokemonsImg[14], namePokemon: this.pokemonsName[14], fav: this.isFav[14] }, { img: this.pokemonsImg[15], namePokemon: this.pokemonsName[15], fav: this.isFav[15] }],
        [{ img: this.pokemonsImg[16], namePokemon: this.pokemonsName[16], fav: this.isFav[16] }, { img: this.pokemonsImg[17], namePokemon: this.pokemonsName[17], fav: this.isFav[17] }, { img: this.pokemonsImg[18], namePokemon: this.pokemonsName[18], fav: this.isFav[18] }, { img: this.pokemonsImg[19], namePokemon: this.pokemonsName[19], fav: this.isFav[19] }]
      ]
    })
  }

  public save(nombrePokemon: string, img: string) {
    if (localStorage.getItem(nombrePokemon)) {
      localStorage.removeItem(nombrePokemon);
      localStorage.removeItem(nombrePokemon+'.img');
      window.scrollTo(0, 0);
    } else {
      localStorage.setItem(nombrePokemon, nombrePokemon);
      localStorage.setItem(nombrePokemon+'.img', img);
    }
    this.arrayPokemons.forEach(item => {
      item.forEach(element => {
        if (element.namePokemon === nombrePokemon) {
          element.fav = !element.fav;
        }
      });
    });
  }

  public next(index: number){
    index++;
    this.pageIndex = index;
    this.start(this.pageIndex);
  }

  public previous(index: number){
    if(index === 0){
      this.pageIndex = this.totalPages
      this.start(this.pageIndex);
    }else{
      index--;
      this.pageIndex = index;
      this.start(this.pageIndex);
    }
  }

}