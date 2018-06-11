import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[acceptOnlyNumbersDirective]'
})
export class AcceptOnlyNumbersDirective {

  step: number
  max: number
  min: number 
  old: string = ""

  /**
   * If has 2 elements it has to be min,max
   * If has 3 elements it has to be step, min, max
   */
  @Input() acceptOnlyNumbersParams: any;

  constructor(public el: ElementRef) {  
    
  }

  @HostListener('keydown', ['$event']) onKeyDown(event) {
    console.log("Sí está llegando");
    let inputElement: HTMLInputElement = this.el.nativeElement
    this.old = inputElement.value
    let e = <KeyboardEvent> event;
    //this.allowOnlyNumbers(e)      
    //this.format(e)           
  }
  
  @HostListener('keyup', ['$event']) onKeyUp(event) { 
    let e = <KeyboardEvent> event;
    let inputElement: HTMLInputElement = this.el.nativeElement  
    let valueNew = inputElement.value
    
    if(!this.allowOnlyNumbers(valueNew)) {
      inputElement.value = this.old
    } else {
      this.format(e)
    }
    
  }

  private readParams() {
    if(this.acceptOnlyNumbersParams == undefined) {    
      return 0
    }   
    this.step = this.acceptOnlyNumbersParams.step
    this.max = this.acceptOnlyNumbersParams.max
    this.min = this.acceptOnlyNumbersParams.min    
  }


  private format(e) {
    let inputElement: HTMLInputElement = this.el.nativeElement
    var currentNumber: number = +inputElement.value
    let currentStringNumber = inputElement.value
    this.readParams()

    if(currentStringNumber.length == 0) {
      return;
    }    

    // Remove the point in case like: 12.
    if (currentStringNumber.indexOf('.') == 0) {
      currentStringNumber.substring(1)
    }

    currentNumber = +inputElement.value

    if(this.step != undefined) {
      this.setStep(currentNumber, inputElement)      
    } 

    currentNumber = +inputElement.value

    if(this.max != undefined) {      
      if(currentNumber > this.max) {
        inputElement.value = this.max + ""
      }  
    }

    currentNumber = +inputElement.value

    if(this.min != undefined) {
      if(currentNumber < this.min) {
        inputElement.value = this.min + ""
      }  
    }
  }


  private setStep(currentNumber, inputElement) {    
    if(currentNumber % this.step != 0) {
      let count: number = Math.round(currentNumber / this.step)
      inputElement.value = count * this.step
    }
  }

  allowOnlyNumbers(word): Boolean {    
    var re = new RegExp('^[+-]?([0-9]*[.])?[0-9]+$');            
    return re.test(word)
    
  }

  // Deprecated
  allowOnlyNumbersOld(e) {
    
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
    // Allow: Ctrl+A
    (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
    // Allow: Ctrl+C
    (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
    // Allow: Ctrl+V
    (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
    // Allow: Ctrl+X
    (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
    // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    let ch = String.fromCharCode(e.keyCode);
    //var re = new RegExp('^-?[0-9]*$');     
    //var re = new RegExp('[+-]?((\d+\.?\d*)|(\.\d+))');        
    
    var re = new RegExp('^[+-]?([0-9]*[.])?[0-9]+$');        
    
    if(re.test(ch))
      return;
    else
        e.preventDefault();    
    // Ensure that it is a number and stop the keypress
    /*if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }*/
  }

}