import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FaqPage implements OnInit {


  faqlist = [
    {
      title: 'شلون تطلعون الحسبة؟',
      body: 'هي مسألة رياضية تدخل فيها عوامل كثيرة مثل الضريبة والوزن وسعر السوق والقيراط، عشان تعرف أكثر ابحث في قوقل عن "طريقة حساب بيع وشراء الذهب" 🏃‍♂️.',
    },
    {
      title: 'متى يعتبر السعر غالي؟',
      body: ' طبعا تحديد السعر بانه غالي هي مسألة نسبية، قد نرى ان المبلغ غالي لكن عندي آخرين قد يكون مقبول، والعكس صحيح. لذلك كل ما يطرح من خلال التطبيق هو مجرد رأي.',
    },
    {
      title: 'من يجب أن يستخدم هذا التطبيق',
      body: 'كل من ولد وليس في فمه ملعقة من ذهب 😅',
    },
    {
      key: 2,
      title: 'عنك أغلاط في الحساب!',
      body: 'امم .. تواصل ويايي🤙',
    },
    {
      title: 'من الي رسم لك الشخصية؟',
      body: 'رسام فنان من موقع freepik ',
    },
    {
      title: 'من المبرمج؟',
      body: 'انا',
    },
    {
      key: 1,
      title: 'وبعدين؟',
      body: null,
    },
    {
      title: 'اخدت اللقاح؟',
      body: 'اي الحمدالله 😷',
    },
  ];

  version: string = '';

  constructor(
    private iab: InAppBrowser,
    public platform: Platform,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.version = environment.version;
  }


  closeApp() {
    this.presentToast();
    setTimeout(() => {
      navigator['app'].exitApp();
    }, 500);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'مع السلامة',
      duration: 2000
    });
    toast.present();
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

}
