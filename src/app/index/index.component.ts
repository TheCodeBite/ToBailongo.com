import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConexionService } from '../service/conexion.service';

import {Md5} from 'ts-md5/dist/md5';

import { MustMatch } from '../_helpers/must-match.validator';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  formRegiter: FormGroup;
  submitted = false;
  user: any;

  constructor( private fb:FormBuilder, private service: ConexionService, private route: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    if(this.user != null){
      this.route.navigate(['/home'])
    }

    this.formRegiter = this.fb.group({
      name: ['', Validators.required],
      apellidoPaterno:['', Validators.required],
      apellidoMaterno: ['', Validators.required], 
      email: ['', [Validators.required, Validators.email]], 
      tel: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      repeatpassword: ['', Validators.required],
      token: [''],
      recovery: [''],
      dospasos:['no'],
      code: ['']
    },{
      validator: MustMatch('password', 'repeatpassword')
    });
  }

  get f() { return this.formRegiter.controls; }
  
  onSubmit(form: any){
    this.submitted = true
    const md5 = new Md5()

    const dest = form.value.email + ""
    const key = md5.appendStr(form.value.email).end() + ""

    form.value.token = key

    if(this.formRegiter.invalid){
      return;
    }
    console.log(this.service.register(form.value))
    
    this.formRegiter.reset();
    this.submitted = false
    

    Swal.fire({
      type: 'success',
      title: 'Registro existoso!',
      text: 'Tu registro concluyo con exito; Valida tu cuenta abriendo el link en tu correo.'
    }).then(() => {
      this.route.navigate(['/']);
      console.log("destinatario " + dest)
      this.service.sendMail(dest, 'Confirmacion de cuenta', 'http://localhost:4200/confirmAccount/' + key);
    });
  }

}
