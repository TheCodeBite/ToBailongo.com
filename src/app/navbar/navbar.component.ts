import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private db: AngularFireDatabase) { 

  }

  admin = false;
  user: any;
  idUser:any;
  temp: any;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    
    if(this.user != null){
      this.admin =true
    }
    console.log(this.user)
  }


  dospasos(){
    this.db.list('users').snapshotChanges().subscribe(res => {
      res.forEach(doc => {
        this.temp = doc.payload.val()
        if(this.temp.email == this.user.email){
          this.idUser = doc.key
        }
      });
      this.user.dospasos = "si";
      this.db.list('users').update(this.idUser, this.user); 
    });
  }

  logout(){
    console.log("cerrando sesion")
    localStorage.clear();
  }

}
