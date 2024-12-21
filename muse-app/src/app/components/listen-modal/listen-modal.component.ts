import { Component, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
declare var bootstrap: any;

@Component({
  selector: 'app-listen-modal',
  imports: [NgxSpinnerModule],
  templateUrl: './listen-modal.component.html',
  styleUrl: './listen-modal.component.css'
})
export class ListenModalComponent {
  imagePreviewText: string = 'Image Preview';
  size: string = '';
  disabled: boolean = true;
  hidden: boolean = true;
  @Input() modalId!: string;

  constructor(private modalService: ModalService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.modalService.openModal$.subscribe((id) => {
      if (id === this.modalId) {
        this.openModal();
      }
    });
  }

  openModal() {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  closeModal() {
    const modalElement = document.getElementById(this.modalId);
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  // Invite
  invite() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.closeModal();
    }, 1000);
  }
}
