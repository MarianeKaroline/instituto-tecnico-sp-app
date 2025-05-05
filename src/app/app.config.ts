import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

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
        provideAnimations()
    ]
};
