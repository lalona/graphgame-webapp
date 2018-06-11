import { Component, OnInit, Input,forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-only-step',
  templateUrl: './input-only-step.component.html',
  styleUrls: ['./input-only-step.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputOnlyStepComponent),
    multi: true
  }]
})
export class InputOnlyStepComponent implements OnInit, ControlValueAccessor {

  writeValue(value: any): void {
    console.log("Receives the initial value " + "Max: " + this.max)
    if (value !== undefined) {      
      this.value = value;
      if(this.value > this.max) {
        this.value = this.max
      }
      else if(this.value < this.min) {
        this.value = this.min
      }
    }
  }
  propagateChange = (_: any) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  value: number = 0

  @Input() step: number
  @Input() max: number
  @Input() min: number

  constructor() { }

  ngOnInit() {
  }

  increase() {
    this.value += this.step
    if(this.value > this.max) {
      this.value = this.max
    }
    this.propagateChange(this.value);
  }

  decrease() {
    this.value -= this.step
    if(this.value < this.min) {
      this.value = this.min
    }
    this.propagateChange(this.value);
  }


}
