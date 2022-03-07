import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CdTimerModule } from 'angular-cd-timer';
import { AppComponent } from './app.component';
import { CardDisplayComponent } from './components/card-display/card-display.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { MetamaskLoginComponent } from './components/metamask-login/metamask-login.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MaxLengthDirective } from './directives/max-length.directive';
import { Web3GuardService } from './services/web3-guard.service';

const appRoutes: Routes = [
  { path: '', component: MetamaskLoginComponent },
  {
    path: 'dashboard/:walletAddress',
    component: SideBarComponent,
    canActivate: [Web3GuardService],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    SideBarComponent,
    CardComponent,
    InputComponent,
    MaxLengthDirective,
    MetamaskLoginComponent,
    CardDisplayComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DragDropModule,
    CdTimerModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
