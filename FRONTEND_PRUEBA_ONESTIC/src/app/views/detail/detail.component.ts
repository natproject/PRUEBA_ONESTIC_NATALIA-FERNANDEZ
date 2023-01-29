import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
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
  public darkTheme: boolean = false;

  constructor(private route: ActivatedRoute, public service: DataService, private router: Router) {
  }

  public ngOnInit(): void {
    this.name = "";
    this.id = 0;
    this.exp = 0;
    this.weight = 0;
    this.height = 0;
    this.sprites = [];
    this.stats = [];
    this.img = "";
    this.types = [];
    this.getAllPokemons();
    this.getDetailPokemon();
  }

  public getDetailPokemon(){
    window.scrollTo(0, 0);
    let dark = this.route.snapshot.paramMap.get('dark');
    switch (dark) {
      case 'true':
        this.darkTheme = true;
        break;

      case 'false':
        this.darkTheme = false;
        break;
    }
    let name = this.route.snapshot.paramMap.get('name');
    this.service.getDetail(name).subscribe(response => {
      this.name = response.name;
      (localStorage.getItem(this.name)) ? this.isFav = true : this.isFav = false;
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
      this.nextPokemon(this.id)
      this.previousPokemon(this.id)
      
    })
  }

  public nextPokemon(id: number): void {
    let nextId = (id+1);
    if (nextId === 1009) {
      this.service.getDetailById(1).subscribe(response => {
        this.nextRoute = response.name
      });
    }else{
      this.service.getDetailById(nextId).subscribe(response => {
        this.nextRoute = response.name
      });
    }
  }

  public previousPokemon(id: number): void{
    let nextId = (id-1);
    if (nextId === 0) {
      this.service.getDetailById(1008).subscribe(response => {
        this.previousRoute = response.name
        console.log(this.previousRoute)
      });
    }else{
      this.service.getDetailById(nextId).subscribe(response => {
        this.previousRoute = response.name
      });
    }
    console.log(this.previousRoute)
  }

  public getAllPokemons(){
    this.service.getAll().subscribe(response => {
      this.totalPokemons = response.count;
    });
  }

  public next(){
    this.router.navigate(['/detail', this.nextRoute, this.darkMode], {skipLocationChange: false}).then(() => {
      this.ngOnInit();
    });
  }

  public previous(){
    this.router.navigate(['/detail', this.previousRoute, this.darkMode], {skipLocationChange: false}).then(() => {
      this.ngOnInit();
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

    public darkMode(): void{
    (this.darkTheme === true) ? this.darkTheme = false : this.darkTheme = true
  }
}
