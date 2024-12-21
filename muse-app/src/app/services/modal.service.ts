import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  constructor() { }

  private modalSubject = new Subject<string>();

  openModal$ = this.modalSubject.asObservable();

  openModal(modalId: string) {
    this.modalSubject.next(modalId);
  }
}
