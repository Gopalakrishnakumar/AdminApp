import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private templateList$: Observable<any[]>;
  private activationStatus$: Observable<boolean>;
  constructor(private appService: AppService) {
  }

  templateList: any[];

  ngOnInit() {
    this.templateList$ = this.appService.templateList$.asObservable();
    this.activationStatus$ = this.appService.activationStatus$.asObservable();
    this.templateList$.subscribe(res => {
      if (res && res.length > 0) {
        this.templateList = res;
      }
    });
    this.activationStatus$.subscribe(res => {
      if (res) {
        alert("Template Successfully Activated!");
      }
      else if (res === false) {
        alert("Something went wrong!");
      }
    });
    this.appService.getTemplateList();
  }

  selectTemplate(templateName) {
    this.templateList.forEach(template => {
      if (template.name == templateName) {
        template.isActive = true;
      }
      else{
        template.isActive = false;
      }
    });
  }

  activateTemplate() {
    this.appService.activateTemplate(this.templateList);
  }
}
