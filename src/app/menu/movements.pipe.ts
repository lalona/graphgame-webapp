import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movements'
})
export class MovementsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var movements = ""
    console.log(value)
    value.forEach(move => {
      
      for (var key in move) {    
        console.log(key)
        if (move.hasOwnProperty(key)) {
          movements += key + ": " + move[key] + "\n"
        }
      }  
    });
    return movements
  }

}
