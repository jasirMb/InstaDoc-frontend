import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig ,MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-yes-no-popup',
  templateUrl: './yes-no-popup.component.html',
  styleUrls: ['./yes-no-popup.component.css']
})
export class YesNoPopupComponent {
  constructor(public dialogRef: MatDialogRef<YesNoPopupComponent>) {}
}
