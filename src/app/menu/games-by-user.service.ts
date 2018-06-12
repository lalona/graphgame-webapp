import { Injectable }             from '@angular/core';
import { Router, Resolve, RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Observable }             from 'rxjs';
import { map, take }              from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class GamesByUserService implements Resolve<any[]> {

  constructor(private db: AngularFireDatabase, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    let id = route.paramMap.get('id');
    console.log(id)    
    return this.db.list('games_played', 
      ref => ref.orderByChild('user')                
                .equalTo(id)).valueChanges();    
  }

}

 
/*@Injectable()
export class CrisisDetailResolver implements Resolve<Crisis> {
  constructor(private cs: CrisisService, private router: Router) {}
 
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> {
    let id = route.paramMap.get('id');
 
    return this.cs.getCrisis(id).pipe(
      take(1),
      map(crisis => {
        if (crisis) {
          return crisis;
        } else { // id not found
          this.router.navigate(['/crisis-center']);
          return null;
        }
      })
    );
  }
}*/
