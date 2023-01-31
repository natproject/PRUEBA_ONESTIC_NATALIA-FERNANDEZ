import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  @Input() pokemonNameDetail: string = "";
  @Input() darkTheme: boolean = false;
  public totalPokemons: number = 0;
  public name: string = "";
  public id: number = 0;
  public abilities: string[] = [];
  public exp: number = 0;
  public height: number = 0;
  public weight: number = 0;
  public stats: string[][] = []
  public types: string[] = []
  public img: string = "";
  public sprites: string[] = [];
  public nextRoute: string = "";
  public previousRoute: string = "";
  public isFav: boolean = false;

  constructor(public service: DataService) {
  }

  public ngOnInit(): void {
    this.name = this.pokemonNameDetail;
    this.getAllPokemons();
    this.getDetailPokemon(this.name);
  }

  public getDetailPokemon(name: string) {
    this.id = 0;
    this.exp = 0;
    this.weight = 0;
    this.height = 0;
    this.sprites = [];
    this.stats = [];
    this.img = "";
    this.types = [];
    window.scrollTo(0, 0);
    this.service.getDetail(name).subscribe(response => {
      this.name = response.name;
      (localStorage.getItem(name)) ? this.isFav = true : this.isFav = false;
      this.id = response.id;
      let abilitiesRes = response.abilities;
      for (let i = 0; i < abilitiesRes.length; i++) {
        this.abilities.push(abilitiesRes[i].ability.name);
      }
      this.exp = response.base_experience;
      this.height = response.height;
      this.weight = response.weight;
      let statsRes = response.stats;
      for (let i = 0; i < statsRes.length; i++) {
        this.stats.push([statsRes[i].stat.name.toUpperCase(), statsRes[i].base_stat.toString()]);
      }
      let typeRes = response.types;
      for (let i = 0; i < typeRes.length; i++) {
        this.types.push(typeRes[i].type.name);
      }
      this.sprites = [response.sprites.front_default, response.sprites.back_default, response.sprites.front_shiny, response.sprites.back_shiny]
      this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
    })
  }

  @Output() nextPokemon = new EventEmitter<string>();
  public next(id: number) {
    if (id === 1008) {
      id = 1;
      this.service.getDetailById(id).subscribe(response => {
        let name = response.name;
        console.log(name)
        this.nextPokemon.emit(name)
        this.getDetailPokemon(name)

      });
    } else {
      id++;
      this.service.getDetailById(id).subscribe(response => {
        let name = response.name;
        console.log(name)
        this.nextPokemon.emit(name)
        this.getDetailPokemon(name)
      });
    }
  }

  @Output() previousPokemon = new EventEmitter<string>();
  public previous(id: number) {
    if (id === 1) {
      id = 1008;
      this.service.getDetailById(id).subscribe(response => {
        let name = response.name;
        console.log(name)
        this.nextPokemon.emit(name)
        this.getDetailPokemon(name)

      });
    } else {
      id--;
      this.service.getDetailById(id).subscribe(response => {
        let name = response.name;
        console.log(name)
        this.nextPokemon.emit(name)
        this.getDetailPokemon(name)
      });
    }
  }


  public getAllPokemons() {
    this.service.getAll().subscribe(response => {
      this.totalPokemons = response.count;
    });
  }

  public save(nombrePokemon: string) {
    if (localStorage.getItem(nombrePokemon)) {
      localStorage.removeItem(nombrePokemon);
      window.scrollTo(0, 0);
    } else {
      localStorage.setItem(nombrePokemon, nombrePokemon);
    }
  }
}
