import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  public name: string = "";
  public id: number = 0;
  public abilities: string[] = [];
  public exp: number = 0;
  public height: number = 0;
  public weight: number = 0;
  public stats: string[][] = []
  public types: string[] = []
  public img: string = "";
  constructor(private route: ActivatedRoute, public service: DataService) { 
  }

  public ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    this.service.getDetail(name).subscribe(response => {
      this.name = response.name;
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
        this.stats.push([statsRes[i].base_stat.toString() , statsRes[i].stat.name]);
      }
      let typeRes = response.types;
      for (let i = 0; i < typeRes.length; i++) {
        this.types.push(typeRes[i].type.name);
      }
      this.img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.id}.png`;
    })
    
  }
  
}
