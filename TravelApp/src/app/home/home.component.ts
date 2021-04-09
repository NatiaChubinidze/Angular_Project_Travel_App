import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { LocationService } from '../destination/location.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  destination: FormControl;
  checkIn: FormControl;
  checkOut: FormControl;
  adults: FormControl;
  destinationForm: FormGroup;
  buttonHover: boolean = false;

  constructor(
    private _router: Router,
    public getLocation: LocationService,
    private _datePipe: DatePipe,
    private formBuilder: FormBuilder
  ) {
    this.destination = new FormControl('', Validators.required);
    this.checkIn = new FormControl('', Validators.required);
    this.checkOut = new FormControl('', Validators.required);
    this.adults = new FormControl('', Validators.required);
    this.destinationForm = this.formBuilder.group({
      destination: this.destination,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      adults: this.adults,
    });
  }

  destinationIsInvalid(): boolean {
    return (
      this.destination.invalid && (this.destination.touched || this.buttonHover)
    );
  }
  checkInIsInvalid(): boolean {
    return this.checkIn.invalid && (this.checkIn.touched || this.buttonHover);
  }
  checkOutIsInvalid(): boolean {
    return this.checkOut.invalid && (this.checkOut.touched || this.buttonHover);
  }
  adultsIsInvalid(): boolean {
    return this.adults.invalid && (this.adults.touched || this.buttonHover);
  }

  ngOnInit(): void {}

  onSubmit() {
    this.getLocation.dataIsValid = this.destinationForm.valid;
    console.log('on submit');
    this.getLocation.queryData.query = this.destination.value;
    this.getLocation.queryData.checkIn = this.checkIn.value;
    this.getLocation.queryData.checkOut = this.checkOut.value;
    this.getLocation.queryData.adults1 = parseInt(this.adults.value);
    console.log(this.getLocation.queryData);

    this.getLocation.queryData.checkIn = this._datePipe.transform(
      this.getLocation.queryData.checkIn,
      'yyyy-MM-dd'
    );
    this.getLocation.queryData.checkOut = this._datePipe.transform(
      this.getLocation.queryData.checkOut,
      'yyyy-MM-dd'
    );
    let adultsNumber = this.getLocation.queryData.adults1;
    this.getLocation.queryData.adults1 =
      adultsNumber <= 0 || adultsNumber === undefined ? 1 : adultsNumber;
    this._router.navigate(['/transport']);
  }
}
