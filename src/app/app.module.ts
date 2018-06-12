import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from './../environments/environment'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserHistoryComponent } from './user-history/user-history.component';
import { SignupComponent } from './signup/signup.component';
import { MembersComponent } from './members/members.component';
import { MenuModule } from './menu/menu.module'

import { CoreModule } from './core/core.module'
import { routes } from './app.routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { GamesByUserService } from './menu/games-by-user.service'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserHistoryComponent,
    SignupComponent,
    MembersComponent,
    UserProfileComponent,
    UserRegistrationComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    CoreModule,
    routes,
    MenuModule
  ], 
  providers: [
    GamesByUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
