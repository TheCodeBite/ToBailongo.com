import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';

import {Md5} from 'ts-md5/dist/md5';
import { AngularFireDatabase } from 'angularfire2/database';
import { ConexionService } from '../service/conexion.service';

@Component({
  selector: 'app-confirmation-reset-password',
  templateUrl: './confirmation-reset-password.component.html',
  styleUrls: ['./confirmation-reset-password.component.css']
})
export class ConfirmationResetPasswordComponent implements OnInit {
  correo = '';
  user: any;
  idUser = '';
  admin = false;

  private readonly notifier: NotifierService;

  constructor(notifierService: NotifierService, private servie: ConexionService , private route: Router, private db: AngularFireDatabase) { 
    this.notifier = notifierService;
  }
 
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    
    if(this.user == null){
      this.admin =true;
    }else{
      this.route.navigate(['/']);
    }

  }

  reset_password(){
    let us = false;
    let key =""
    //console.log("el correo es" + this.correo)
    this.db.list('users').snapshotChanges().subscribe(res => {
      const md5 = new Md5();
      res.forEach(doc => {
        this.idUser = doc.key
        this.user = doc.payload.val()
        if(this.user.email == this.correo ){
          key = md5.appendStr(this.user.password + "").end() + ""
          
          us = true;
          this.user.recovery = key
          this.db.list('users').update(this.idUser, this.user); 
        }
        });
        if(us) {
          this.servie.sendMail(this.correo, 'Recuperacion de contraseña', 'http://localhost:4200/reset_password/' + key)
          this.notifier.notify("success", "Solcitud enviada a " + this.correo);
        }else{
          this.notifier.notify("success", "No se encontro el correo " + this.correo);
        }
    });
    
  }

}
