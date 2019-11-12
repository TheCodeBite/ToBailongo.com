import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { ConexionService } from '../service/conexion.service';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  private readonly notifier: NotifierService;
  
  ruta = 'https://us-central1-tobailongo.cloudfunctions.net/sendMail?';
  user: any;
  correo: '';
  contrasena = ''; 

  showalert = false

  todos: AngularFireList<any[]>;

  constructor(private route: Router, private notifierService: NotifierService, private service:ConexionService, private db: AngularFireDatabase) { 
    this.notifier = notifierService;
  }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if(this.user != null){
      this.route.navigate(['/home'])
    }
  }

  
  login(){
    this.db.list('users').snapshotChanges().subscribe(res => {

      res.forEach(doc => {
        //console.log(doc + " -> " + doc.key)
        this.user = doc.payload.val()
        const email = this.user.email;
        if(this.user.email == email && this.user.password == this.contrasena){
          localStorage.setItem('user', JSON.stringify(this.user));
          if(this.user.token == "validado"){
            
            if(this.user.dospasos == "si"){
              let valor = ((Math.random() * 9999 )+ 1000) + "";
              const a = parseInt(valor);

              this.user.code = a +"";

              this.db.list('users').update(doc.key, this.user); 

              localStorage.setItem('user', JSON.stringify(this.user));
              
              this.route.navigate(['/security'])
            }else{
              this.route.navigate(['/home'])
            }
          }else{
            console.log("necesitas validar tu cuenta");
            this.showalert = true
          }
        }

      });
    });


  }

  close(){
    this.showalert = false
  }

  registro(){
    
    this.route.navigate(['register'])
    
  }
}
