import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transforms'
})
export class TransformsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var tranformations = ""
    
    for (var key in value) {    
        if (value.hasOwnProperty(key)) {
          if(key == "rotation") {
            tranformations += "rotation: "
            value[key].forEach(element => {              
              for (var k in element) {    
                if (element.hasOwnProperty(k)) {
                  tranformations += k + ": " + element[k] + "\n"                
                }
              }    
            });
                
          } else {
            tranformations += key + ": " + value[key] + "\n"            
          }
            
        }
    }
    return tranformations;
  }

}
