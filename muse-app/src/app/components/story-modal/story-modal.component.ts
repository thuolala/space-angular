import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output } from '@angular/core';
declare var bootstrap: any;
import { ModalService } from '../../services/modal.service';
import { Router } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-story-modal',
  imports: [NgxSpinnerModule],
  templateUrl: './story-modal.component.html',
  styleUrl: './story-modal.component.css'
})
export class StoryModalComponent {
  imagePreviewText: string = 'Image Preview';
  size: string = '';
  disabled: boolean = true;
  hidden: boolean = true;
  @Input() modalId!: string;
  @Output() img: string = '';

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

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreviewText = `<img src="${e.target?.result}" alt="Uploaded Image">`;

        // Create a temporary Image object to get dimensions
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          this.size = `Width: ${img.width}px, Height: ${img.height}px`;
        }

        const imagePreviewElement = document.getElementById('imagePreview');
        if (imagePreviewElement) {
          imagePreviewElement.innerHTML = this.imagePreviewText;
          this.img = this.imagePreviewText;
          this.hidden = false;
          this.disabled = false;
        }
      };
      reader.readAsDataURL(file);
    } else {
      this.imagePreviewText = 'Image Preview';
      this.size = '';
      this.hidden = true;
      this.disabled = true;
    }
  }

  // Check if image uploaded
  uploaded() {
    const imagePreviewElement = document.getElementById('imagePreview');
    if (imagePreviewElement) {
      return true;
    }
    return false;
  }

  // Remove image
  remove() {
    const imagePreviewElement = document.getElementById('imagePreview');
    if (imagePreviewElement) {
      imagePreviewElement.innerHTML = '';
      this.size = '';
      this.hidden = true;
      this.disabled = true;
    }
  }

  // Post
  post() {
    /** spinner starts on init */
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
      this.closeModal();
    }, 1000);
  }

  returnImg(){
    return this.imagePreviewText;
  }
}
