import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AngularFireDatabase } from 'angularfire2/database';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  showalert = false

  contrasena = ''
  contrasena2 = ''

  token = '';
  user: any;
  idUser = '';
  temp: any;
  admin = false;

  constructor(private _route:ActivatedRoute, private route: Router, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    
    if(this.user == null){
      this.admin =true;
    }else{
      this.route.navigate(['/']);
    }

    let us = false;

    this.token += this._route.snapshot.paramMap.get('token');
    console.log("el token es" + this.token);


    this.db.list('users').snapshotChanges().subscribe(res => {
      res.forEach(doc => {
        this.temp = doc.payload.val()
        if(this.temp.recovery == this.token){
          this.idUser = doc.key;
          this.user = this.temp;
          us = true
        }
      });

      if(us == false){
        this.route.navigate(['/reset_password/' + this.token + "/error"])
      }

    });

  }

  close(){
    this.showalert = false;
  }

  restart(){
    if(this.contrasena == this.contrasena2){
      this.user.password = this.contrasena
      this.user.repeatpassword = this.contrasena
      this.user.recovery = ''

      this.db.list('users').update(this.idUser, this.user); 

      Swal.fire({
        type: 'success',
        title: 'Contraseña cambiada',
        text:'Los cambios se han aplicaddo con exito; Vuelva a iniciar sesion'
      
      }).then(() =>{
        this.route.navigate(['/'])
      })
    }else{
      this.showalert = true;

    }
  }
  

}
