import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

import { Observable, map } from 'rxjs';

import { SnackbarNotificationOptions } from './models/snackbar-notification-options.model';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private _defaultConfig = {
        snackBar: {
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            duration: 5000,
            panelClass: []
        } as MatSnackBarConfig,
        actionText: 'Ok'
        // actionText: '\u2715', // HTML code for 'x' (close)
    };

    constructor(
        private snackBar: MatSnackBar
    ) { }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * @method message | Notificação padrão do sistema
     * @param message Mensagem a ser exibida na notificação
     */
    public message(message: string, options?: SnackbarNotificationOptions): Observable<boolean> {

        const config = this._getConfig(options, ['bg-accent', 'text-on-accent']);

        const snackbarRef = this.snackBar.open(message, config.actionText, { ...config.snackBar });

        return snackbarRef.onAction()
            .pipe(
                map(() => true)
            );
    }

    /**
     * @method info | Notificação de informação do sistema
     * @param message Mensagem a ser exibida na notificação
     */
    public info(message: string, options?: SnackbarNotificationOptions): Observable<boolean> {

        const config = this._getConfig(options, ['bg-primary', 'text-on-primary']);

        const snackbarRef = this.snackBar.open(message, config.actionText, { ...config.snackBar });

        return snackbarRef.afterDismissed()
            .pipe(
                map(r => r.dismissedByAction)
            );
    }

    /**
     * @method error | Notificação de erro do sistema
     * @param message Mensagem a ser exibida na notificação de erro
     */
    public error(message: string, options?: SnackbarNotificationOptions): Observable<boolean> {

        const config = this._getConfig(options, ['snackbar-error-message']);

        const snackbarRef = this.snackBar.open(message, config.actionText, { ...config.snackBar });

        return snackbarRef.onAction()
            .pipe(
                map(() => true)
            );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Cria a model de configuração necessária para a abertura do snackbar de notificação
     * @param options Configurações adicionais definidas para a notificação
     */
    private _getConfig(options?: SnackbarNotificationOptions, panelClass?: string | string[]): { actionText: string, snackBar: MatSnackBarConfig } {

        const config = this._defaultConfig;

        if (options?.actionText) {
            config.actionText = options?.actionText;
        }

        if (panelClass && panelClass?.length > 0) {
            config.snackBar.panelClass = Array.isArray(panelClass) ? [...panelClass] : [panelClass];
        }

        if (options?.duration) {
            config.snackBar.duration = options?.duration;
        }

        return config;
    }

}
