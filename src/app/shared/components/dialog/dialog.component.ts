import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogRef
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    imports: [MatButtonModule, MatIconModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

    readonly dialogRef = inject(MatDialogRef<DialogComponent>);
    readonly data = inject<string>(MAT_DIALOG_DATA);

    onNoClick(): void {
        this.dialogRef.close();
    }

}
