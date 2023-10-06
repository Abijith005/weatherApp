

import { Injectable } from "@angular/core";
import { AppearanceAnimation, DialogLayoutDisplay, DisappearanceAnimation, ToastNotificationInitializer, ToastPositionEnum, ToastProgressBarEnum, ToastUserViewTypeEnum } from "@costlydeveloper/ngx-awesome-popup";

@Injectable({
    providedIn: 'root'
})

export class ToasterService {

    constructor() {

    }

    showToaster() {

      const newToastNotification = new ToastNotificationInitializer();

      newToastNotification.setTitle('');
      newToastNotification.setMessage('City Not Found !!');

      // Choose layout color type
      newToastNotification.setConfig({
      autoCloseDelay: 3000, // optional
      textPosition: 'center', // optional
      layoutType: DialogLayoutDisplay.NONE, // SUCCESS | INFO | NONE | DANGER | WARNING
      progressBar: ToastProgressBarEnum.INCREASE, // INCREASE | DECREASE | NONE
      toastUserViewType: ToastUserViewTypeEnum.SIMPLE, // STANDARD | SIMPLE
      animationIn: AppearanceAnimation.BOUNCE_IN, // BOUNCE_IN | SWING | ZOOM_IN | ZOOM_IN_ROTATE | ELASTIC | JELLO | FADE_IN | SLIDE_IN_UP | SLIDE_IN_DOWN | SLIDE_IN_LEFT | SLIDE_IN_RIGHT | NONE
      animationOut: DisappearanceAnimation.BOUNCE_OUT, // BOUNCE_OUT | ZOOM_OUT | ZOOM_OUT_WIND | ZOOM_OUT_ROTATE | FLIP_OUT | SLIDE_OUT_UP | SLIDE_OUT_DOWN | SLIDE_OUT_LEFT | SLIDE_OUT_RIGHT | NONE
      toastPosition: ToastPositionEnum.TOP_CENTER,
      allowHtmlMessage: true,
      disableIcon: true,
      });

      // Simply open the popup
      newToastNotification.openToastNotification$();
    }

}