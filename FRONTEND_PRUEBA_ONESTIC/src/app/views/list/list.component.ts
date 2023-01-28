import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  public pokemons = [];
  public pageIndex: number = 0;
  public totalPokemons = 0;
  public counter: number = 0;
  public pokemonsName: string[] = [];
  public pokemonsUrl: string[] = [];
  public pokemonsImg: string[] = [];
  public arrayPokemons: { img: string, namePokemon: string, id: string }[][] = [[{ img: '', namePokemon: '', id: '' }]];
  public pokemonsId: string[] = [];
  public showGrid: boolean = true;


  constructor(public service: DataService) { }

  ngOnInit() {
    this.start(0);
  }

  public start(pageIndex: number) {
    window.scrollTo(0, 0);
    this.pokemonsUrl = [];
    this.pokemonsName = [];
    this.pokemonsImg = [];
    this.service.getResponse(pageIndex * 20, 20).subscribe(response => {
      this.counter = response.results.length;
      this.totalPokemons = response.count;
      for (let i = 0; i < this.counter; i++) {
        this.pokemonsName.push(response.results[i].name);
        this.pokemonsUrl.push(response.results[i].url)
      }
      for (let i = 0; i < this.pokemonsUrl.length; i++) {
        let image = this.pokemonsUrl[i].split("/");
        this.pokemonsId.push(image[6]);
        this.pokemonsImg.push(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${image[6]}.png`);
      }
      this.arrayPokemons = [
        [{ img: this.pokemonsImg[0], namePokemon: this.pokemonsName[0], id: this.pokemonsId[0] }, { img: this.pokemonsImg[1], namePokemon: this.pokemonsName[1], id: this.pokemonsId[1] }, { img: this.pokemonsImg[2], namePokemon: this.pokemonsName[2], id: this.pokemonsId[2] }, { img: this.pokemonsImg[3], namePokemon: this.pokemonsName[3], id: this.pokemonsId[3] }],
        [{ img: this.pokemonsImg[4], namePokemon: this.pokemonsName[4], id: this.pokemonsId[4] }, { img: this.pokemonsImg[5], namePokemon: this.pokemonsName[5], id: this.pokemonsId[5] }, { img: this.pokemonsImg[6], namePokemon: this.pokemonsName[6], id: this.pokemonsId[6] }, { img: this.pokemonsImg[7], namePokemon: this.pokemonsName[7], id: this.pokemonsId[7] }],
        [{ img: this.pokemonsImg[8], namePokemon: this.pokemonsName[8], id: this.pokemonsId[8] }, { img: this.pokemonsImg[9], namePokemon: this.pokemonsName[9], id: this.pokemonsId[9] }, { img: this.pokemonsImg[10], namePokemon: this.pokemonsName[10], id: this.pokemonsId[9] }, { img: this.pokemonsImg[11], namePokemon: this.pokemonsName[11], id: this.pokemonsId[11] }],
        [{ img: this.pokemonsImg[12], namePokemon: this.pokemonsName[12], id: this.pokemonsId[12] }, { img: this.pokemonsImg[13], namePokemon: this.pokemonsName[13], id: this.pokemonsId[13] }, { img: this.pokemonsImg[14], namePokemon: this.pokemonsName[14], id: this.pokemonsId[14] }, { img: this.pokemonsImg[15], namePokemon: this.pokemonsName[15], id: this.pokemonsId[15] }],
        [{ img: this.pokemonsImg[16], namePokemon: this.pokemonsName[16], id: this.pokemonsId[16] }, { img: this.pokemonsImg[17], namePokemon: this.pokemonsName[17], id: this.pokemonsId[17] }, { img: this.pokemonsImg[18], namePokemon: this.pokemonsName[18], id: this.pokemonsId[18] }, { img: this.pokemonsImg[19], namePokemon: this.pokemonsName[19], id: this.pokemonsId[19] }]
      ]
    })
  }

  public changeDisplay(){
    (this.showGrid === true) ? this.showGrid = false : this.showGrid = true;
  }
}