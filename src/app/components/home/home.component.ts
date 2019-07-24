import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ipAddr:any = [];
  ipInfo:any = [];
  ISPInfo: any = [];
  infoStatus:boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<{ip:string}>('https://jsonip.com').subscribe(data=>{
      this.ipAddr = data;
      console.log(this.ipAddr);
    });
    
  }
  public loadInfo(){
    this.http.get<{info:string}>('http://www.geoplugin.net/json.gp?ip='+this.ipAddr).subscribe(data=>{
      this.ipInfo = data;
      // this.infoStatus = true;
      console.log(this.ipInfo);
      this.getISPinfo();
    })
    
  }
  public getISPinfo(){
    this.http.get<{isp:string}>('http://ip-api.com/json/'+this.ipAddr).subscribe(data=>{
      this.ISPInfo = data;
      this.infoStatus = true;
      console.log(this.ISPInfo);
    })
  }


}