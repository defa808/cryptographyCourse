import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { ExportFileComponent } from './export-file/export-file.component';
import { ImportFileComponent } from './import-file/import-file.component';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ExportFileComponent,
    ImportFileComponent,
  ],
  imports: [
    MatIconModule,
    HttpClientModule,
    BrowserModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSliderModule, 
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
