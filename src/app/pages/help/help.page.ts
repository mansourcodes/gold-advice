import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  trustedVideoUrlArray: SafeResourceUrl[] = [];
  youtubeUrlsArray = [

    {
      title: 'كيف تستخدم تطبيق صاحبة الذهب',
      link: "https://www.youtube.com/embed/H8HlAe_l-2s",
      trustedUrl: null,
    },
    {
      title: 'ليش الذهب غالي ؟',
      link: "https://www.youtube.com/embed/H8nDpqBzRbU",
      trustedUrl: null,
    },
    {
      title: 'خمس اشياء لازم تعرفها قبل لا تشتري ذهب ',
      link: "https://www.youtube.com/embed/9foa_R7u_hs",
      trustedUrl: null,
    },
  ]

  constructor(
    public navCtrl: NavController,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let trustedUrl;
    for (let item of this.youtubeUrlsArray) {
      trustedUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(item.link);
      item.trustedUrl = trustedUrl;
    }
  }

}
