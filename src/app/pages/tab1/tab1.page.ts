import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  pureList: number[] = [24, 23, 22, 21, 20, 19, 18, 17, 16];
  currencyList = [
    { key: 'BHD', label: 'دينار بحريني' },
    { key: 'SAR', label: 'ريال السعودي' },
  ]
  form: FormGroup;
  constructor(
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      weight: new FormControl(100, [Validators.required]),
      price: new FormControl(1000),
      carat: new FormControl(24),
      marketـprice: new FormControl(20),
      vat: new FormControl(5),
      currency: new FormControl('BHD'),
      soundON: new FormControl(true),
    });

    this.storage.get('fromValues')
      .then(
        data => {
          this.form.patchValue(data);
          this.updateAdvice();
        },
        error => console.error(error)
      );


    // this.updateAdvice();
    for (const [key, value] of Object.entries(this.form.controls)) {
      this.form.get(key).valueChanges.subscribe(x => {
        this.updateAdvice();
      });
    }


  }


  priceWithoutVAT: number = 0;
  priceOfOneGram: number = 0;
  carat_persentage: number = 0;
  workmanshipPrice: number = 0;
  benefitPersantage: number = 0;
  adviceList = [
    { range: 0, key: 0, label: 'هناك خطاء' },
    { range: 5, key: 4, label: 'استثمار ناجح' },
    { range: 7, key: 3, label: 'اشتري حالا' },
    { range: 10, key: 2, label: 'جدا ممتاز' },
    { range: 15, key: 1, label: 'البائع جيد' },
    { range: 20, key: 0, label: 'السعر تمام' },
    { range: 25, key: -1, label: 'يمشي السعر' },
    { range: 30, key: -2, label: 'يقدر يخفضك' },
    { range: 35, key: -3, label: 'خفضني اكثر' },
    { range: 40, key: -4, label: 'لا توو ماج' },
    { range: 200, key: -5, label: 'غاليي جدا' },
  ];
  advice: any = { range: 20, key: 0, label: 'لا اعلم' };
  currentCurrency = { key: 'SAR', label: 'ريال السعودي' };

  updateAdvice() {

    const weight = this.form.get('weight').value ?? 0;
    const price = this.form.get('price').value ?? 0;
    const carat = this.form.get('carat').value ?? 0;
    const marketـprice = this.form.get('marketـprice').value ?? 0;
    const vat = this.form.get('vat').value ?? 0;
    const currencyKey = this.form.get('currency').value ?? 'BHD';

    this.priceWithoutVAT = price - price * vat / 100;
    this.priceOfOneGram = this.priceWithoutVAT / weight;
    this.carat_persentage = carat / 24;
    this.workmanshipPrice = this.priceOfOneGram - (marketـprice * this.carat_persentage);


    this.benefitPersantage = this.workmanshipPrice / (marketـprice * this.carat_persentage) * 100;


    this.advice = this.adviceList.filter(x => x.range > this.benefitPersantage)[0];
    this.currentCurrency = this.currencyList.find(x => x.key == currencyKey);

    if (this.advice == undefined) {
      this.advice = { range: 20, key: 0, label: 'لا اعلم' };
    }
    if (this.benefitPersantage > 200) {
      this.advice = { range: 200, key: -5, label: 'هناك مشكلة' };
    }

    this.playAudio();

    setTimeout(() => {

      this.storage.set('fromValues', this.form.value)
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );

    }, 1000);



  }

  playAudio() {
    if (this.form.get('soundON').value) {
      let audio = new Audio();
      audio.volume = 0.05;
      // audio.src = "../../../assets/sounds/coinflip.wav";
      audio.src = "../../../assets/sounds/retrocoin.wav";
      audio.load();
      audio.play();
    }
  }

  toggleSoundOn() {

    console.log(this.form.get('soundON').value);

    if (this.form.get('soundON').value) {
      this.form.patchValue({ soundON: false });

    } else {
      this.form.patchValue({ soundON: true });

    }
  }


  searchMarketPriceStringUrl() {
    const currencyKey = this.form.get('currency').value ?? 'BHD';
    this.currentCurrency = this.currencyList.find(x => x.key == currencyKey);

    console.log(this.currentCurrency);

    let href = "https://www.google.com/search?q=سعر+الذهب+" + this.currentCurrency.label.replace(' ', '+') + "+قيراط+٢٤";

    console.log(href);


    return '';
  }

}
