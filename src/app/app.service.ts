import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public templateList$:BehaviorSubject<any[]> = new BehaviorSubject<any>([]);
  public activationStatus$:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
  
  constructor(private http:HttpClient) { }

  getTemplateList(){
    this.http.get(`url`).subscribe((res:any[]) => this.templateList$.next(res));
  }

  activateTemplate(templateList){
    this.http.post(`url`,templateList).subscribe(res => this.activationStatus$.next(res != undefined));
  }

}
