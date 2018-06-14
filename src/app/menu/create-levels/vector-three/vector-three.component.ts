import { Component, OnInit, Input,forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Vector3 } from '../level'

@Component({
  selector: 'app-vector-three',
  templateUrl: './vector-three.component.html',
  styleUrls: ['./vector-three.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => VectorThreeComponent),
    multi: true
  }]
})
export class VectorThreeComponent implements OnInit, ControlValueAccessor {

  vector3: Vector3 = new Vector3()

  writeValue(v: Vector3): void { 
    console.log(v)   
    this.vector3 = v
  }
  propagateChange = (_: Vector3) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  @Input() step: number
  @Input() max: number
  @Input() min: number

  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    console.log(this.vector3)
    this.propagateChange(this.vector3)
  }

}
