import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';


import 'firebase/storage';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent implements OnInit {
  selectedFile: File;
  imagePath : any ;
  imageName : string;
  isModalVisible = false;
  selectedImage: string ;
  constructor (private userService : UserService, private toaster : ToastrService){}
  ngOnInit(): void {
    this.userService.getDocuments().subscribe((response:any) => {
     
       this.imagePath = response.path
      //  this.imageName = response.imageName
        console.log(this.imagePath);
      // let imageName = response[0].fileName
      
    },(err : any)=>{
      console.log(err);
      
    })
  }
  onFileSelected(event :any) {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    
  }

  onSubmit() {
    console.log(this.selectedFile);
    
   
    
    this.userService.recordUpload(this.selectedFile).subscribe((response) => {
      this.toaster.success("image uploaded succesfully")
      this.userService.getDocuments().subscribe((response:any) => {
     
        this.imagePath = response.path
       //  this.imageName = response.imageName
         console.log(this.imagePath);
       // let imageName = response[0].fileName
       
     },(err : any)=>{
       console.log(err);
       
     })
      
    },(err : any)=>{
      console.log(err);
      
    })
    
  }
  showImage(image :string) {
    this.selectedImage = image;
    this.isModalVisible = true;
  }
  hideImage() {
    this.isModalVisible = false;
  }
  removeRecord(path :string){
    this.userService.removeRecord(path).subscribe((response) => {
      this.toaster.success("image deleted successfully")
      this.userService.getDocuments().subscribe((response:any) => {
     
        this.imagePath = response.path
       //  this.imageName = response.imageName
         console.log(this.imagePath);
       // let imageName = response[0].fileName
       
     },(err : any)=>{
       console.log(err);
       
     })
    },(err :any) => {
      console.log(err);
      
    })
  }
  
}
