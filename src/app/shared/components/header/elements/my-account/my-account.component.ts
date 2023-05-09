
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})
export class MyAccountComponent implements OnInit {
  EmployeeName: string = "";
  



  constructor(private _Router: Router, ) {
  }

  ngOnInit() { }

  logout() {
    localStorage.removeItem("Authorization");
    this._Router.navigate([""]);
  }
 
}
