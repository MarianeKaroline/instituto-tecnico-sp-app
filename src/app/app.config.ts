import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { ApplicationConfig, LOCALE_ID, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';

import { routes } from './app.routes';
import { provideNgxMask } from 'ngx-mask';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(
            routes,
            withEnabledBlockingInitialNavigation()
        ), 
        provideClientHydration(withEventReplay()),
        provideHttpClient(),
        provideNgxMask(),
        provideAnimations(),
        provideNativeDateAdapter(),
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    ]
};
