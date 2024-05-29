import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideToastr(),
    provideRouter(routes),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        apiKey: 'AIzaSyCVmCI7JOKAXwQaGD38xxrfE-Kgd242w5o',
        authDomain: 'salajuegos-mv.firebaseapp.com',
        projectId: 'salajuegos-mv',
        storageBucket: 'salajuegos-mv.appspot.com',
        messagingSenderId: '83137137248',
        appId: '1:83137137248:web:ac3edc8cc2dd5c679d1105',
      })
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'tplab-4',
          appId: '1:737067449284:web:3c639aa0fdc8c964700291',
          storageBucket: 'tplab-4.appspot.com',
          apiKey: 'AIzaSyD7t9oaqshDxd81OVRXpz_v-AmF9Gw2m3Y',
          authDomain: 'tplab-4.firebaseapp.com',
          messagingSenderId: '737067449284',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(
      AngularFireModule.initializeApp({
        projectId: 'tplab-4',
        appId: '1:737067449284:web:3c639aa0fdc8c964700291',
        storageBucket: 'tplab-4.appspot.com',
        apiKey: 'AIzaSyD7t9oaqshDxd81OVRXpz_v-AmF9Gw2m3Y',
        authDomain: 'tplab-4.firebaseapp.com',
        messagingSenderId: '737067449284',
      })
    ),
  ],
};
