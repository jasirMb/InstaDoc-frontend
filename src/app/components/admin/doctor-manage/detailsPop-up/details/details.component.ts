import { Component,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  doctor :any = {}
 constructor (@Inject(MAT_DIALOG_DATA) public data: Object,private toastr: ToastrService ) {
  this.doctor = data
  console.log(this.doctor);
  
 }
 copyValue(value: string) {
  navigator.clipboard.writeText(value).then(() => {
    this.toastr.success('copied successfully');
  }).catch(err => {
    console.error(`Failed to copy value to clipboard: ${err}`);
  });
}
}
