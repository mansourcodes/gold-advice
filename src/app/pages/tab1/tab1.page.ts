import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  pureList: number[] = [24, 23, 22, 21, 20, 19, 18, 17, 16];
  currencyList = [
    { key: 'BHD', label: 'دينار بحريني', decimal: 3 },
    { key: 'SAR', label: 'ريال السعودي', decimal: 2 },
    { key: 'KWD', label: 'دينار كويتي', decimal: 3 },
    { key: 'OMR', label: 'ريال عماني', decimal: 2 },
    { key: 'AED', label: 'درهم اماراتي', decimal: 2 },
  ]
  form: FormGroup;
  constructor(
    private storage: Storage,
    private iab: InAppBrowser,
    public platform: Platform,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      weight: new FormControl(10, [Validators.required]),
      price: new FormControl(250, [Validators.required]),
      carat: new FormControl(24, [Validators.required]),
      marketـprice: new FormControl(20, [Validators.required]),
      vat: new FormControl(5, [Validators.required]),
      currency: new FormControl('BHD', [Validators.required]),
      soundON: new FormControl(true),
      welcome_card_hide: new FormControl(false),
      welcome_card_hide_forever: new FormControl(false),
      welcome_card_checkbox: new FormControl(false),
    });

    this.storage.get('fromValues')
      .then(
        data => {
          data.welcome_card_hide = false;
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



  resetForm() {
    let data = {
      weight: 10,
      price: 250,
      // carat: 24,
      // marketـprice: 20,
    }
    this.form.patchValue(data);
  }

  page_is_loaded = false;
  ionViewDidEnter() {
    this.page_is_loaded = true;
  }


  priceWithoutVAT: number = 0;
  priceOfOneGram: number = 0;
  carat_persentage: number = 0;
  caratGlobalPrice: number = 0;
  workmanshipPrice: number = 0;
  benefitPersantage: number = 0;
  adviceList = [
    { range: 0, key: 0, label: 'هناك خطأ', action: '' },
    { range: 5, key: 4, label: 'استثمار ناجح', action: 'نوصي بالشراء' },
    { range: 7, key: 3, label: 'اشتري حالا', action: 'نوصي بالشراء' },
    { range: 10, key: 2, label: 'جدا ممتاز', action: 'نوصي بالشراء' },
    { range: 15, key: 1, label: 'البائع جيد', action: 'نوصي بالشراء' },
    { range: 20, key: 1, label: 'السعر ممتاز ', action: 'نوصي بالشراء' },
    { range: 25, key: -1, label: 'السعر زين', action: 'نوصي بالشراء/طلب تخفيض' },
    { range: 27, key: -1, label: 'يمشي السعر', action: 'نوصي بالشراء/طلب تخفيض' },
    { range: 30, key: -2, label: 'يقدر يخفضك', action: 'نوصي بالشراء/طلب تخفيض' },
    { range: 35, key: -3, label: 'خفضني اكثر', action: 'نوصي بطلب تخفيض' },
    { range: 40, key: -3, label: 'ما يصلح', action: 'نوصي بطلب تخفيض' },
    { range: 50, key: -2, label: 'تمزح؟', action: 'نوصي بطلب تخفيض' },
    { range: 60, key: -4, label: 'لا تمزح!', action: 'نوصي بطلب تخفيض' },
    { range: 70, key: -4, label: 'غالي', action: 'نوصي بطلب تخفيض' },
    { range: 80, key: -5, label: 'غالي جدا', action: 'نوصي بطلب تخفيض' },
    { range: 100, key: -5, label: 'تبا، غالي واجد', action: 'نوصي بالخروج من المحل' },
    { range: 999999999999, key: -5, label: 'لا تعليق', action: 'نوصي بالخروج من المحل' },
  ];
  advice: any = { range: 20, key: 0, label: 'لا اعلم' };
  currentCurrency = { key: 'BHD', label: 'دينار بحريني', decimal: 3 };

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
    this.caratGlobalPrice = this.roundTo(marketـprice * this.carat_persentage, this.currentCurrency.decimal);
    this.workmanshipPrice = this.priceOfOneGram - this.caratGlobalPrice;


    this.benefitPersantage = this.workmanshipPrice / (marketـprice * this.carat_persentage) * 100;


    this.advice = this.adviceList.filter(x => x.range > this.benefitPersantage)[0];
    this.currentCurrency = this.currencyList.find(x => x.key == currencyKey);

    if (this.advice == undefined) {
      this.advice = { range: 20, key: 0, label: 'لا اعلم', action: 'تأكد من الارقام' };
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

    let href = "https://www.google.com/search?q=سعر+الذهب+" + this.currentCurrency.label.replace(' ', '+');


    const browser = this.iab.create(href);
    browser.show();

    // if (!this.platform.is("desktop")) {
    //   const browser = this.iab.create(href);
    //   browser.show();
    // } else {
    //   window.open(href, '_blank');
    // }

  }

  openUrl(url) {

    const browser = this.iab.create(url);
    browser.show();

    // if (!this.platform.is("desktop")) {
    //   const browser = this.iab.create(url);
    //   browser.show();
    // } else {
    //   window.open(url, '_blank');
    // }

  }



  hideWelcomeCard() {
    if (this.form.get('welcome_card_checkbox').value) {
      this.form.patchValue({ welcome_card_hide: true, welcome_card_hide_forever: true });
    } else {
      this.form.patchValue({ welcome_card_hide: true });
    }
  }


  decimal() {
    return '0.' + this.currentCurrency.decimal + '-' + this.currentCurrency.decimal
  }


  roundTo(num: number, places: number) {
    const factor = 10 ** places;
    return Math.round(num * factor) / factor;
  };

}
