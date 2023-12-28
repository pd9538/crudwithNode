import { Component, OnInit } from '@angular/core';
import { SocketService } from './socket.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontend';

  result:any;
  squareF!:FormGroup;
  registerF!:FormGroup;
  showForm:boolean=false;
  name:any;
  mobile:any;
  address:any;
  email:any;
  data:any;
  iseditMode:boolean=false;

  get f(){
    return this.registerF.controls;
  }

  constructor(
              private socket:SocketService,
              private toastr:ToastrService  
            ){}
  
  ngOnInit(): void {
    this.squareF=new FormGroup({
      value:new FormControl('')
    })

    this.registerF=new FormGroup({
      _id:new FormControl(''),
      name:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      email:new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$')]),
      mobile:new FormControl('',[Validators.required,Validators.pattern('^[0-9]{10}$')]),
    })
  this.getData();
  }

  getData(){
    this.socket.getData({},'getdoc').subscribe((result:any)=>{
      this.data=result.data;
    })
  }

  updateData(id:any){
    this.iseditMode=true;
    this.socket.getData({id},'getdocid').subscribe((result:any)=>{
      let cust=result.result[0];
      this.registerF.patchValue({
        name:cust.name,
        address:cust.address,
        mobile:cust.mobile,
        email:cust.email,
        _id:cust._id
      })
    })
  }

  submitF(){
    let post=this.registerF.value;
   
      if(this.registerF.valid){
        this.socket.getData(post,'create').subscribe((result:any)=>{
          if(result.status==1){
            this.showForm=true;
            this.result=result.data;
            this.registerF.reset();
            this.toastr.success(result.message);
            this.getData();
          }else{
            this.showForm=false;
            this.toastr.error(result.message);
          }
        })
      }else{
        Object.keys(this.registerF.controls).forEach((field:any)=>{
          const control=this.registerF.get(field);
          if(control instanceof FormControl){
            control.markAsTouched({onlySelf:true});
          }
        })
        this.toastr.error('Fill Mandatory field','Failure');
      }
  }

  deleteData(id:any){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning'
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire(
      {
        showCloseButton: true,
        title: 'Confirm',
        text: 'Are you sure to delete',
        showCancelButton: true,
        confirmButtonText: 'Process',
        cancelButtonText: 'Cancel',
        reverseButtons: false
      }
    ).then((result) => {
      if(result.value){
        this.socket.getData({id},'delete').subscribe((result:any)=>{
          if(result.status==1){
            this.toastr.success(result.message);
            this.getData();
          }else{
            this.toastr.error(result.message);
          }
      })
    }

    })
  }
 
}
