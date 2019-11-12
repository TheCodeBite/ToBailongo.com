import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {
  token = '';
  user : any;
  idUser = '';
  JsonUser : any;

  constructor(private _route:ActivatedRoute, private route:Router, private db: AngularFireDatabase) { }

  ngOnInit() {
    let us = false;
    this.token = this._route.snapshot.paramMap.get('token');
    this.db.list('users').snapshotChanges().subscribe(res => {
    
      res.forEach(doc => {
        let key = doc.key
        this.user = doc.payload.val()
        if(this.user.token == this.token){
          this.JsonUser = this.user;
          us = true;
          this.idUser = key;
        }
      });

      if(us == false){
        this.route.navigate(['/confirmAccount/' + this.token + "/error"])
      }

    });
    
  }

  send(){
    this.db.list('users').snapshotChanges().subscribe(res => {
      console.log(this.JsonUser)
      this.JsonUser.token = "validado";
      res.forEach(doc => {
        //this.user = doc.payload.val()
        if(doc.key == this.idUser){
          this.db.list('users').update(this.idUser, this.JsonUser); 
          Swal.fire({
            type: 'success',
            title: 'Tu cuenta ha sido validada con exito',
            text: 'Gracias por validar tu cuenta, vuelve a iniciar sesión'
          }).then(() => {
            this.route.navigate(['/'])
          })

        }

        });

    });
  }

}
