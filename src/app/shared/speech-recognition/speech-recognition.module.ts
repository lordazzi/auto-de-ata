import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeechRecognitionService } from './speech-recognition.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SpeechRecognitionService
  ]
})
export class SpeechRecognitionModule { }
