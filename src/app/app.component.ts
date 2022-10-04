import { Component, ViewChild } from '@angular/core';
import { TimezoneComponent } from './timezone/timezone.component';
import { TimezonesService } from './timezones.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('first') timezoneComponent1! : TimezoneComponent;
  @ViewChild('second') timezoneComponent2! : TimezoneComponent;
  title = 'Homework2++';

  timezonesService : TimezonesService;

  constructor(private timezonesServ : TimezonesService){
    this.timezonesService = timezonesServ;
  }

  setFirstTimezoneSettingsEnabled(isSecondSettingsEnabled : boolean){
    if(!isSecondSettingsEnabled) {
      this.timezoneComponent1.setSettingsEnabled();
    }
  }

  setSecondTimezoneSettingsEnabled(isFirstSettingsEnabled : boolean){
    if(!isFirstSettingsEnabled) {
      this.timezoneComponent2.setSettingsEnabled();
    }
  }

  getCurrentTimezone() : string{
    return this.timezonesService.getCurrentTimeZone();
  }
}
