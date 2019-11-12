import { Component, OnInit } from '@angular/core';
//import 'rxjs/add/operator/toPromise';
import { URLSearchParams } from 'url';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  constructor(private http: HttpClient) { }

  sendEmail(){
    let url =`https://us-central1-tobailongo.cloudfunctions.net/httpEmail`
    let params: URLSearchParams = new URLSearchParams();
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Acces-Control-Allow-Origin': '*'});

    params.set('to', '');
    params.set('from', '');
    params.set('subject', 'test-email');
    
    return this.http.post(url, params).toPromise().then( res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  ngOnInit() {
  }

}
