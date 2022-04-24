import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

let appInit: boolean = false;

firebase.initializeApp(environment.firebase);

// initialize our app after firebase complete authenticating the user
// This will allow us to display the correct UI right away
firebase.auth().onAuthStateChanged(() => {
  if (!appInit) {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }

  appInit = true;
});
