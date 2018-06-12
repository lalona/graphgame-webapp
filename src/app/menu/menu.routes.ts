import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateLevelsComponent } from './create-levels/create-levels.component'
import { ManageUsersComponent } from './manage-users/manage-users.component'
import { StadisticsComponent } from './stadistics/stadistics.component'
import { StadisticsByUserComponent } from './stadistics-by-user/stadistics-by-user.component'
import { ManageLevelsComponent } from './manage-levels/manage-levels.component'
import { MenuComponent } from './menu/menu.component';
import { GamesByUserService } from './games-by-user.service'

export const routerConfig: Routes = [
    {
        path: 'menu',
        component: MenuComponent,
        children: [
            {
                path: 'manage-users',
                component: ManageUsersComponent
            },
            {
                path: 'create-levels',
                component: CreateLevelsComponent
            },
            {
                path: 'manage-levels',
                component: ManageLevelsComponent
            },
            {
                path: 'stadistics',
                component: StadisticsComponent                
            },
            {
                path: 'games/:id',
                component: StadisticsByUserComponent                
            }            
        ]
    }
    
];

export const MenuRouting: ModuleWithProviders = RouterModule.forChild(routerConfig);