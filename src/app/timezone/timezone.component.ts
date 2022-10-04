import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { Locale } from '../locale';
import { TimezonesService } from '../timezones.service';

@Component({
  selector: 'app-timezone',
  templateUrl: './timezone.component.html',
  styleUrls: ['./timezone.component.css']
})
export class TimezoneComponent implements OnInit {
  @Output() activityChange = new EventEmitter<boolean>();

  selectedLocale : string;
  selectedTimezone : string;
  isDisabled = false;
  currentDatetime : string;
  worldTimezones : Array<string>;
  locales : Array<Locale>;
  timerSubscription?: Subscription;
  interval : Observable<number>;
  currentTimezone : string;

  constructor(private timezonesService : TimezonesService) { 
    this.currentDatetime = "Please choose and/or set current";
    this.worldTimezones = timezonesService.world_timezones();
    this.locales = timezonesService.locales();
    this.currentTimezone = timezonesService.getCurrentTimeZone();

    this.selectedLocale = this.locales[0].locale;
    this.selectedTimezone = this.worldTimezones[0];
    
    this.interval = interval(1000);
  }

  ngOnInit(): void {
  }

  updateTimer(){
    this.currentDatetime = new Date().toLocaleString(this.selectedLocale, {timeZone: this.selectedTimezone});
  }

  startTimer(){
      this.timerSubscription = this.interval.subscribe(() => this.updateTimer());
  }

  stopTimer(){
    if(this.timerSubscription && !this.timerSubscription.closed){
      this.timerSubscription.unsubscribe();
    }
  }

  setSettingsEnabled()
  {
    this.isDisabled = false;
    this.stopTimer();
    this.activityChange.emit(true);
  }

  setSettingsDisabled(){
    this.isDisabled = true;
    this.startTimer();
    this.activityChange.emit(false);
  }

  isCurrentLocation() : boolean{
    return this.currentTimezone  === this.selectedTimezone;
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }
}
