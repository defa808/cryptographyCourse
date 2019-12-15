import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-export-file',
  templateUrl: './export-file.component.html',
  styleUrls: ['./export-file.component.scss']
})
export class ExportFileComponent implements OnInit {

  constructor() { }
  @Input()
  text: String = "";
  @Input()
  title: String = "";
  @Input()
  nameFile: String = "encryptedSystem"


  ngOnInit() {
  }

  expFile() {
    var fileName = this.nameFile + ".txt";
    this.saveTextAsFile(this.text, fileName);
  }

  saveTextAsFile(data, filename) {

    if (!data) {
      console.error('Console.save: No data')
      return;
    }

    if (!filename) filename = 'console.json'

    var blob = new Blob([data], { type: 'text/plain' }),
      e = document.createEvent('MouseEvents'),
      a = document.createElement('a')
    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(blob, filename);
    }
    else {
      var e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

      a.download = filename;
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
      a.click();
    }
  }


}
