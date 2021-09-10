import { Component } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMobile: boolean | any;
  title = 'front';

  constructor(private deviceService: DeviceDetectorService) {
    this.isMobile  = this.deviceService.isMobile();
  }
}
