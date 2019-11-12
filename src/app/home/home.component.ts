import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any;

  constructor(private route: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    
    if(this.user == null){
      this.route.navigate(['/'])
    }
  }

}
