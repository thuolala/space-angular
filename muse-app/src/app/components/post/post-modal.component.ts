import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output } from '@angular/core';
declare var bootstrap: any;
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-post-modal',
  imports: [NgxSpinnerModule, CommonModule, FormsModule],
  templateUrl: './post-modal.component.html',
  styleUrl: './post-modal.component.css'
})
export class PostModalComponent {
  imagePostPreviewText: string = '';
  size: string = '';
  disabled: boolean = true;
  hidden: boolean = true;
  @Input() modalId!: string;
  @Output() img: string = '';
  postText: string = '';

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

  onFilePostUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePostPreviewText = `<img src="${e.target?.result}" alt="Uploaded Image">`;

        // Create a temporary Image object to get dimensions
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          this.size = `Width: ${img.width}px, Height: ${img.height}px`;
        }

        const imagePreviewPostElement = document.getElementById('imagePreviewPost');
        if (imagePreviewPostElement) {
          imagePreviewPostElement.innerHTML = this.imagePostPreviewText;
          this.img = this.imagePostPreviewText;
          this.hidden = false;
          this.disabled = false;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePostPreviewText = 'Image Preview';
      this.size = '';
      this.hidden = true;
      this.disabled = true;
    }
  }

  // Check if image uploaded
  uploaded() {
    const imagePreviewPostElement = document.getElementById('imagePreviewPost');
    if (imagePreviewPostElement) {
      return true;
    }
    return false;
  }

  // Remove image
  remove() {
    const imagePreviewPostElement = document.getElementById('imagePreviewPost');
    if (imagePreviewPostElement) {
      imagePreviewPostElement.innerHTML = '';
      this.size = '';
      this.hidden = true;
      this.disabled = true;
    }
  }

  // Check if text entered
  text() {
    const imagePreviewPostElement = document.getElementById('imagePreviewPost');
    if (imagePreviewPostElement) {
      return true;
    }
    return false;
  }

  // Post
  post() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.closeModal();
      this.remove();
    }, 1000);
  }

  returnImgPost() {
    return this.imagePostPreviewText;
  }
}
