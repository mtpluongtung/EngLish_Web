import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Learning_Web';

  ngOnInit() {

  }
  ngOnDestroy() {
    console.log('ngOnDestroy');
  }

  onActivate(componentRef: any){

  }
}

