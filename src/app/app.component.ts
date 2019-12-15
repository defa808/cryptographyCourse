import { Component } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lab1';
  textInput: String = "";
  shift: number = 0;
  bruteForceValue: string = "";
  bruteForceKey: Number = 0;
  selectedAlgorithm: Number = 0;
  AKoef: number = 15;
  BKoef: number = 5;
  CKoef: number = 0;
  gaslo: string = "";
  chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 '.split('');
  gammaText: String = "";

  selectedShiff: Number = 0;
  shiffsTritemius: any = [
    { value: 0, viewValue: 'Line' },
    { value: 1, viewValue: 'Not line' },
    { value: 2, viewValue: 'Gaslo' },

  ]

  algorithms: any = [
    { value: 0, viewValue: 'Caesar Cipher' },
    { value: 1, viewValue: 'Trithemius Cipher' },
    { value: 2, viewValue: 'Gamma Mod' }
  ];


  encrypt(text, shift) {
    switch (this.selectedAlgorithm) {
      case 0: this.textInput = this.ceaserCrypt(text, shift); break;
      case 1: this.textInput = this.tretemiusEncode(text, shift); break;
      case 2: this.textInput = this.modEncryptOrDecrypt(text); break;
    }
  }

  ceaserCrypt(text, shift) {
    let res = "";
    for (let index = 0; index < text.length; index++) {
      if (shift < 0)
        return this.ceaserCrypt(text, shift + this.chars.length);
      let charNumber = this.chars.findIndex(x => x == text[index]);
      let charNewNumber = (charNumber + shift) % this.chars.length;
      res += this.getCharFromChars(charNewNumber);
    }
    return res;
  }

  getCharFromChars(index) {
    if (this.chars.length > index)
      return this.chars[index]

    this.getCharFromChars(index - this.chars.length);
  }

  decrypt(textInput, shift) {
    switch (this.selectedAlgorithm) {
      case 0: this.encrypt(textInput, shift * -1); break;
      case 1: this.textInput = this.tretemiusDecode(textInput, shift); break;
      case 2: this.textInput = this.modEncryptOrDecrypt(textInput); break;
    }
  }

  doTextareaValueChange(event) {
    this.textInput = event.target.value;
  }

  bruteForceChange(event) {
    this.bruteForceKey = event.value;
    this.bruteForceValue = this.ceaserCrypt(this.textInput, event.value);
  }


  tretemiusEncode(text, shift) {
    let res = "";
    for (let index = 0; index < text.length; index++) {
      const element = text[index];
      let shiftTretemius = 0;
      if (this.selectedShiff == 0)
        shiftTretemius = this.AKoef * shift + this.BKoef;
      if (this.selectedShiff == 1)
        shiftTretemius = this.AKoef * Math.pow(shift, 2) + this.BKoef * shift + this.CKoef;
      if (this.selectedShiff == 2)
        shiftTretemius = this.getShiftWorldTretemius(index);
      res += this.ceaserCrypt(element, shiftTretemius);
    }
    return res;

  }

  tretemiusDecode(text, shift) {
    let res = "";
    for (let index = 0; index < text.length; index++) {
      const element = text[index];
      let shiftTretemius = 0;
      if (this.selectedShiff == 0)
        shiftTretemius = this.AKoef * shift + this.BKoef;
      if (this.selectedShiff == 1)
        shiftTretemius = this.AKoef * Math.pow(shift, 2) + this.BKoef * shift + this.CKoef;
      if (this.selectedShiff == 2)
        shiftTretemius = this.getShiftWorldTretemius(index);
      shiftTretemius *= -1;
      res += this.ceaserCrypt(element, shiftTretemius);
    }
    return res;
  }

  createGamma(text) {
    let currentGamma = "";
    for (let index = 0; text.length >= currentGamma.length; index++) {
      let randomNumber = Math.floor(Math.random() * 10);
      let letter = this.getCharFromChars(randomNumber);
      currentGamma += letter;
    }
    return currentGamma;
  }

  modEncryptOrDecrypt(text) {
    let res = "";
    if (this.gammaText == "")
      this.gammaText = this.createGamma(text);

    for (let index = 0; index < text.length; index++) {
      res += this.getCharFromChars(
        this.chars.findIndex(x => x == text[index])
        ^ this.chars.findIndex(x => x == this.gammaText[index]));
    }
    return res;
  }

  getShiftWorldTretemius(index) {
    if (index > this.gaslo.length) {
      return this.getShiftWorldTretemius(index - this.gaslo.length);
    }

    return this.gaslo.charCodeAt(index);
  }

  changeText(newValue: String) {
    this.textInput = newValue;
  }
  changeGamma(newValue: String) {
    this.gammaText = newValue;
  }

}
