import { Component, OnInit, Input,forwardRef } from '@angular/core';
import { Rotation, RotationAxis } from '../level';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { _ } from 'underscore'
@Component({
  selector: 'app-roations-sequence',
  templateUrl: './roations-sequence.component.html',
  styleUrls: ['./roations-sequence.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RoationsSequenceComponent),
    multi: true
  }]
})
export class RoationsSequenceComponent implements OnInit {

  rotations: Rotation[]
  rotation: Rotation = new Rotation()
  rotationAxis = RotationAxis

  writeValue(r: Rotation[]): void {     
    this.rotations = r
  }
  propagateChange = (_: Rotation[]) => {};

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

  constructor() { }

  ngOnInit() {
  }

  public addRotation(axis) {
    this.rotation.axis = axis
    this.rotations.push(this.rotation)
    this.propagateChange(this.rotations)
    this.rotation = new Rotation()
  }

  public removeRotation(rotation) {
    this.rotations = _.without(this.rotations, rotation)
    this.propagateChange(this.rotations)
  }

}
