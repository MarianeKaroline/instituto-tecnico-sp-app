import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';

type videoDialog = {
    video: string;
    title: string;
    youtube: boolean;
}


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    imports: [MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

    readonly dialogRef = inject(MatDialogRef<DialogComponent>);
    readonly data = inject<videoDialog>(MAT_DIALOG_DATA);
    readonly sanitizer = inject(DomSanitizer);

    get safeVideoUrl(): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl(this.data.video);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
