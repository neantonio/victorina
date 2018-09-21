import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class MyRouterService {

  constructor(private router: Router) { }

  onMainPage=true;

  navigate(direction){
    this.router.navigate(direction);
  }

  toGamePage(){
    this.onMainPage=false;
   this. navigate(['/game'])
  }
   toGame2Page(){
    this.onMainPage=false;
   this. navigate(['/rotate'])
  }
  toMainPage(){
    this.onMainPage=true;
   this. navigate(['/'])
  }

}
