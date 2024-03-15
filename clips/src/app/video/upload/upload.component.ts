import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  isDragOver = false;
  file: File | null = null;
  nextStep = false;
  title = new FormControl('', {
    validators: [Validators.required, Validators.minLength(3)],
    nonNullable: true,
  });
  showAlert = false;
  alertColor = 'blue';
  alertMsg = '請稍等，您的影片正在上傳';
  inSubmission = false;

  constructor(private storage: AngularFireStorage) {}

  uploadForm = new FormGroup({
    title: this.title,
  });
  storeFile($event: Event) {
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer?.files.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') return;
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  uploadFile() {
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = '請稍等，您的影片正在上傳';
    this.inSubmission = true;
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    this.storage.upload(clipPath, this.file);
  }
}
