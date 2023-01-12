import { Component } from '@angular/core';
import {faMinus} from '@fortawesome/free-solid-svg-icons';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'QRCodeGeneration';
  emailList: string[] = [];
  newEmail: string = '';
  faMinus = faMinus;
  EMAIL_HEADER: string = "mList: ";
  HEADER_SEPARATOR: string = " --- ";
  MESSAGE_HEADER: string = "msg: ";
  EMAIL_SEPARATOR: string = "; ";
  SUBJECT_HEADER: string = "subj: ";
  ID_HEADER: string = "uuid: ";
  QRCodeString: string = '';
  codeGenerationError: string = '';
  emailInfo: string = '';
  subjectInfo: string = '';
  messageInfo: string = '';

  language = '';
  header = '';
  emailLabel = '';
  emailPlaceHolder = '';
  addEmailButtonText = '';
  subjectLabel = '';
  subjectPlaceholder = '';
  subjectDefault = '';
  messageLabel = '';
  messagePlaceholder = '';
  widthLabel = '';
  codeGenerationText = '';
  generatedCodeInfoHeader = '';
  emailInfoLabel = '';
  subjectInfoLabel = '';
  messageInfoLabel = '';

  constructor() {
    this.setLanguageToEnglish();
  }

  setLanguageToEnglish() {
    this.language = 'eng';
    this.header = 'Generator of QR codes for \'QRMessageSender\' app';
    this.emailLabel = 'new e-mail';
    this.emailPlaceHolder = 'exemple@exemple.com';
    this.addEmailButtonText = 'Add e-mail';
    this.subjectLabel = 'Subject';
    this.subjectPlaceholder = 'Enter e-mail subject';
    this.subjectDefault = 'QR code scanned.';
    this.messageLabel = 'Message';
    this.messagePlaceholder = 'Enter e-mail message';
    this.widthLabel = 'QR code width';
    this.codeGenerationText = 'Generate QR code';
    this.generatedCodeInfoHeader = 'Generated QR code contains the following information:';
    this.emailInfoLabel = 'e-mails:';
    this.subjectInfoLabel = 'subject:';
    this.messageInfoLabel = 'message:';
  }

  setLanguageToCatalan() {
    this.language = 'cat';
    this.header = 'Generador de codis QR per la app \'QRMessageSender\'';
    this.emailLabel = 'correu electronic nou';
    this.emailPlaceHolder = 'exemple@exemple.com';
    this.addEmailButtonText = 'Afageix el corru';
    this.subjectLabel = 'Assumpte';
    this.subjectPlaceholder = 'Introdueixi l\'assumpte del correu';
    this.subjectDefault = 'codi QR escanejat.';
    this.messageLabel = 'Missatge';
    this.messagePlaceholder = 'Introdueixi el missatge del correu';
    this.widthLabel = 'amplada del codi QR';
    this.codeGenerationText = 'Generael codi QR';
    this.generatedCodeInfoHeader = 'El codi generat conté la següent informació:';
    this.emailInfoLabel = 'correus:';
    this.subjectInfoLabel = 'assumpte:';
    this.messageInfoLabel = 'missatge:';
  }

  addEmail() {
    this.emailList.push(this.newEmail);
    this.newEmail = '';
  }

  removeEmail(index: number) {
    this.emailList.splice(index, 1);
  }

  hideQRCode() {
    this.QRCodeString = '';
    this.emailInfo = '';
    this.subjectInfo = '';
    this.messageInfo = '';
  }

  showQRCode(qrString: string, emailInfo: string, subjectInfo: string, messageInfo: string) {
    this.QRCodeString = qrString;
    this.emailInfo = emailInfo;
    this.subjectInfo = subjectInfo;
    this.messageInfo = messageInfo;
    this.codeGenerationError = '';
  }

  setQRCodeString(subject: string, message: string) {
    // If there are no specified e-mails we show an alert and stop generation.
    if (this.emailList.length === 0) {
      this.hideQRCode();
      if (this.language === 'eng') {
        this.codeGenerationError = 'ERROR: you must specify at least one target e-mail.';
      } else if (this.language === 'cat') {
        this.codeGenerationError = 'ERROR: has d\'introduir almenys un correu electrònic.';
      }
      return;
    }

    // If there is currently an attempt of adding a new e-mail we show
    // an alert to prevent errors of missing added mails.
    if (this.newEmail !== "") {
      this.hideQRCode();
      if (this.language === 'eng') {
        this.codeGenerationError = `WARNING: The mail ${this.newEmail} was not added to the mailing list even though it was specified. Please add it to the e-mail list or remove it entirely.`
      } else if (this.language === 'cat') {
        this.codeGenerationError = `ATENCIÓ: El correu ${this.newEmail} no s'ha afegit a la llista de correus tot i haver-se escrit. Si us plau esborri'l completament o afegeixi'l a la llista de correus.`
      }
      return;
    }

    let qrString = '';

    qrString += this.EMAIL_HEADER;
    qrString += this.emailList.join(this.EMAIL_SEPARATOR);
    let emailInfo = this.emailList.join(', ');

    qrString += this.HEADER_SEPARATOR;

    qrString += this.SUBJECT_HEADER;
    let subjectInfo = subject;
    qrString += subjectInfo;

    qrString += this.HEADER_SEPARATOR;

    qrString += this.MESSAGE_HEADER;
    qrString += message;
    let messageInfo = message;

    qrString += this.HEADER_SEPARATOR;

    qrString += this.ID_HEADER;
    let uuid = uuidv4();
    qrString += uuid;

    this.showQRCode(qrString, emailInfo, subjectInfo, messageInfo);
    return;
  }
}