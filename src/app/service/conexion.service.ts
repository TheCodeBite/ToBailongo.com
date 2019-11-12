import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database'
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
  userLis: AngularFireList<any>;
  items: Observable<any[]>;

  ruta = 'https://us-central1-tobailongo.cloudfunctions.net/sendMail?'
  sms = 'https://us-central1-tobailongo-74e10.cloudfunctions.net/sendSMS?'
  selecUser: User = new User();

  constructor(private firebase: AngularFireDatabase, private http: HttpClient) { }


  register(user: any){
    return this.firebase.list('users').push(user);
  }

  sendSMS(codigo){
    console.log("el codigo es " + codigo)
    return this.http.get(this.sms +  "codigo=" + codigo).subscribe(response => {
      console.log("enviado")
    });
  }

  sendMail(dest, sub, url){
    console.log("enviado..." + dest + " url: " + url + " sub: " + sub);
    let cuerpo = '<a href="'+ url + '"> '+url+"</a>"
    console.log("cuerpo " + cuerpo)
    return this.http.get(this.ruta + "dest=" + dest + "&sub=" + sub + "&body=" + cuerpo).subscribe(response => {
      console.log("enviado...");
    });
  }
}
