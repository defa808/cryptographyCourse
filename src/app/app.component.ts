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
    { value: 2, viewValue: 'Gamma Mod' },
    { value: 3, viewValue: 'Poem Cipher' }
  ];


  encrypt(text, shift) {
    switch (this.selectedAlgorithm) {
      case 0: this.textInput = this.ceaserCrypt(text, shift); break;
      case 1: this.textInput = this.tretemiusEncode(text, shift); break;
      case 2: this.textInput = this.modEncryptOrDecrypt(text); break;
      case 3: this.textInput = this.bookEncrypt(text, this.createBookDictionary()); break;
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
      case 3: this.textInput = this.bookDecrypt(textInput, this.createBookDictionary()); break;
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

  changePoem(newValue:String){
    this.poem = newValue;
  }

  shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  //   # Алгоритм віршованого шифрування:
  // #   1.	Вибрати вірш для використання в якості ключа шифрування.
  // #   2.	Пронумерувати  всі стовпчики і рядки вибраного ключа шифрування двозначними цифрами: CC SS відповідно.
  // #   3.	Символу M  вхідного повідомлення поставити у відповідність 4-значний код  CС/SS такого ж вибраного випадково символу ключа шифрування. Тут чисельник кожного дробу - номер рядка, а знаменник - номер стовпчика.
  // #   4.	Код CС/SS занести до шифрограми і додати кому.
  // #   5.	Повторити п.п.3-4  для кожного символу повідомлення, що шифрується

  bookEncrypt(text, dictionary) {
    let output = [];
    let letterDict = {};

    for (const charElem of text) {
      this.shuffle(dictionary);
      letterDict = this.findLetterInDictionary(dictionary, charElem);
      if (letterDict == undefined)
        throw `Letter not found: ${charElem}`;

      output.push(`${letterDict['row']}/${letterDict['col']}`);
    }
    return output.join(",");
  }

  findLetterInDictionary(dictionary: any, char: any): {} {
    for (const letter of dictionary) {
      if (char == letter['char'])
        return letter;
    }
  }

  // # Алгоритм розшифрування з використанням вірша:
  // #   1.	Для елемента коду CС/SS криптограми визначити  номер стовпчика CС  і рядка SS зашифрованого символу.
  // #   2.	Знайти в ключі шифрування символ, що знаходиться на перетині CС колонки і SS-рядка.
  // #   3.	Записати знайдений символ в якості розшифрованого символу.
  // #   4.	Повторити п.п.1-3 для кожного елементу коду, відокремленого за допомогою ком.

  bookDecrypt(text, dictionary) {
    let plain = '';
    let row = 0;
    let col = 0;

    let encodes = text.split(",");

    for (const code of encodes) {
      row = parseInt(code.split('/')[0]);
      col = parseInt(code.split('/')[1]);
      let letter = this.findLetterUsingCode(row, col, dictionary);
      if (letter == undefined)
        throw ("Something went wrong, couldn't find letter in poem.")
      plain += letter
    }
    return plain;

  }

  findLetterUsingCode(row: number, col: number, dictionary: any) {
    for (const letter of dictionary) {
      if (row == letter['row'] && col == letter['col'])
        return letter['char'];
    }
  }

  poem: String;

  createBookDictionary() {
    let dictionary = [];
    let row = 0;
    let col = 0;

    for (const charElement of this.poem) {
      dictionary.push({ char: charElement, row: row, col: col });
      col += 1;
      if (charElement == '\n') {
        row += 1;
        col = 0;
      }
    }
    return dictionary;
  }



}
