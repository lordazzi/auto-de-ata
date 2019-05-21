import { Speech } from './shared/speech-recognition/speech.model';
import { SpeechRecognitionService } from './shared/speech-recognition/speech-recognition.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  current = 0;
  speeches: string[] = [];

  teste = ['um', 'dois', 'tres'];

  constructor(
    private speechService: SpeechRecognitionService
  ) { }

  ngOnInit(): void {
    this.speechService.hear().subscribe(
      // tslint:disable-next-line:no-console
      speech => {
        this.speeches[this.current] = speech.transcript;
        console.info(this.speeches);
        if (speech.isFinal) {
          this.current++;
        }
      },
      error => console.error(error),
      // tslint:disable-next-line:no-console
      () => console.info('complete')
    );
  }
}
