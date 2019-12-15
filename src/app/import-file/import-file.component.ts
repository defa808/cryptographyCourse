import { Component, OnInit, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EventEmitter } from '@angular/core';
@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.scss']
})
export class ImportFileComponent implements OnInit {

  constructor(private http: HttpClient) { }
  fileToUpload: File = null;
  ngOnInit() {
  }
  @Input()
  title: String = "Import";
  @Output()
  onChanged: EventEmitter<any> = new EventEmitter();

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    debugger

    var reader = new FileReader();
    reader.onload = function (e) {
      let text: any = reader.result;
      this.onChanged.emit(text);
    }.bind(this);

    reader.readAsText(this.fileToUpload);
  }

}
