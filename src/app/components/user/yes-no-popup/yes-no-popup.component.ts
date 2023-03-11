import { Component,Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-yes-no-popup',
  templateUrl: './yes-no-popup.component.html',
  styleUrls: ['./yes-no-popup.component.css']
})
export class YesNoPopupComponent {
  constructor(public dialogRef: MatDialogRef<YesNoPopupComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}
}
