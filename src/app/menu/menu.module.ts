import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRouting } from './menu.routes'
import { MenuComponent } from './menu/menu.component';
import { CreateLevelsComponent } from './create-levels/create-levels.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { StadisticsComponent } from './stadistics/stadistics.component';
import { FormsModule }   from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    MenuRouting,
    FormsModule
  ],
  declarations: [
    MenuComponent, 
    CreateLevelsComponent, 
    ManageUsersComponent, 
    StadisticsComponent
  ]
})
export class MenuModule { }
