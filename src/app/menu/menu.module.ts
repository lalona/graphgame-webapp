import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRouting } from './menu.routes'
import { MenuComponent } from './menu/menu.component';
import { CreateLevelsComponent } from './create-levels/create-levels.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { StadisticsComponent } from './stadistics/stadistics.component';
import { FormsModule }   from '@angular/forms';
import { ManageLevelsComponent } from './manage-levels/manage-levels.component';
import {MatExpansionModule, MatFormFieldModule} from '@angular/material';
import { AcceptOnlyNumbersDirective } from './create-levels/acept-only-numbers.directive';
import { InputOnlyStepComponent } from './create-levels/input-only-step/input-only-step.component';
import { StadisticsByUserComponent } from './stadistics-by-user/stadistics-by-user.component';
import { GamesByUserService } from './games-by-user.service';
import { TransformsPipe } from './transforms.pipe';
import { MovementsPipe } from './movements.pipe'

@NgModule({
  imports: [
    CommonModule,
    MenuRouting,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule
  ],
  declarations: [
    MenuComponent, 
    CreateLevelsComponent, 
    ManageUsersComponent, 
    StadisticsComponent, ManageLevelsComponent, 
    AcceptOnlyNumbersDirective, InputOnlyStepComponent,
    StadisticsByUserComponent,
    TransformsPipe,
    MovementsPipe
  ]
})
export class MenuModule { }
