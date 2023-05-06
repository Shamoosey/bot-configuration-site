import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginScreenComponent } from './components/login-screen/login-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './assets/material.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { provideFirebaseApp, getApp, initializeApp, FirebaseOptions } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [
    AppComponent,
    LoginScreenComponent,
    LandingPageComponent,
    EditProfileComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    provideFirebaseApp(() => initializeApp({ 
      apiKey: "AIzaSyDKAlG2CuyW_tOqUjeaTm2wB8tMQ2mx1BM",
      authDomain: "joebot-40cc6.firebaseapp.com",
      projectId: "joebot-40cc6",
      storageBucket: "joebot-40cc6.appspot.com",
      messagingSenderId: "joebot-40cc6.appspot.com",
      appId: "1:179744080285:web:23c6f5202ef4780053ef74"
    } as FirebaseOptions)),
    provideAuth(() => getAuth()),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
