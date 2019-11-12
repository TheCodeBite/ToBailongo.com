import { Component, OnInit } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5'; 
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ConexionService } from '../service/conexion.service';



@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.component.html',
  styleUrls: ['./seguridad.component.css']
})
export class SeguridadComponent implements OnInit {
  secretKey = "forappeno"
  code = ""
  constructor(private route: Router, private service:ConexionService) { }
  user: any;
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.service.sendSMS(this.user.code);
  }

  validar(){
    console.log(this.user)
    if(this.user.code == this.code){
      console.log("cuenta validad con exito");
      this.route.navigate(['/home'])
    }
  }
}
