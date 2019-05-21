import { Speech } from './speech.model';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
declare const webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  hear(): Observable<Speech> {
    const subject = new Subject<Speech>();
    const hearing: SpeechRecognition = new (webkitSpeechRecognition || SpeechRecognition)();
    hearing.continuous = true;
    hearing.lang = 'pt-BR';
    hearing.interimResults = true;
    hearing.maxAlternatives = 1;

    hearing.onresult = event => {
      const speech = new Speech();
      const currentResult = event.results[event.results.length - 1];

      speech.confidence = currentResult[0].confidence;
      speech.isFinal = currentResult.isFinal;
      speech.transcript = currentResult[0].transcript;
      subject.next(speech);
    };

    hearing.onerror = error => subject.error(error);
    // tslint:disable-next-line:no-console
    hearing.onspeechstart = event => console.info('onspeechstart', event);
    // tslint:disable-next-line:no-console
    hearing.onspeechend = event => console.info('onspeechend', event);

    hearing.start();
    return subject.asObservable();
  }
}
