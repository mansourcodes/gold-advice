import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  pureList: number[] = [24, 22, 21, 18];
  currencyList = [
    { key: 'BHD', label: 'دينار بحريني' },
    { key: 'SAR', label: 'ريال السعودي' },
  ]
  form: FormGroup;
  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      weight: new FormControl(0, [Validators.required]),
      price: new FormControl(0),
      carat: new FormControl(24),
      marketـprice: new FormControl(15),
      vat: new FormControl(5),
      currency: new FormControl('SAR'),
    });



    for (const [key, value] of Object.entries(this.form.controls)) {
      this.form.get(key).valueChanges.subscribe(x => {
        console.log(x);
        this.updateAdvice();
      });
    }


  }


  updateAdvice() {
    console.log('updateAdvice');

  }

}
