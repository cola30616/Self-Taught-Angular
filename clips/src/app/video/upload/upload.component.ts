import firebase from 'firebase/compat/app';
import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { v4 as uuid } from 'uuid';
import { last, switchMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ClipService } from 'src/app/services/clip.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnDestroy {
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
  percentage = 0;
  showPercentage = false;
  user: firebase.User | null = null;
  task?: AngularFireUploadTask;

  constructor(
    private storage: AngularFireStorage,
    private auth: AngularFireAuth,
    private clipService: ClipService,
    private router: Router
  ) {
    auth.user.subscribe((user) => (this.user = user));
  }

  // 切換頁面時，取消上傳，釋放記憶體
  ngOnDestroy(): void {
    this.task?.cancel();
  }
  uploadForm = new FormGroup({
    title: this.title,
  });
  storeFile($event: Event) {
    this.isDragOver = false;
    this.file = ($event as DragEvent).dataTransfer
      ? ($event as DragEvent).dataTransfer?.files.item(0) ?? null
      : ($event.target as HTMLInputElement).files?.item(0) ?? null;
    if (!this.file || this.file.type !== 'video/mp4') return;
    this.title.setValue(this.file.name.replace(/\.[^/.]+$/, ''));
    this.nextStep = true;
  }

  uploadFile() {
    this.uploadForm.disable();
    this.showAlert = true;
    this.alertColor = 'blue';
    this.alertMsg = '請稍等，您的影片正在上傳';
    this.inSubmission = true;
    this.showPercentage = true;
    const clipFileName = uuid();
    const clipPath = `clips/${clipFileName}.mp4`;

    this.task = this.storage.upload(clipPath, this.file);
    const clipRef = this.storage.ref(clipPath);
    this.task.percentageChanges().subscribe((progress) => {
      this.percentage = (progress as number) / 100;
    });

    this.task
      .snapshotChanges()
      .pipe(
        last(),
        switchMap(() => clipRef.getDownloadURL())
      )
      .subscribe({
        next: async (url) => {
          const clip = {
            uid: this.user?.uid as string,
            displayName: this.user?.displayName as string,
            title: this.title.value,
            fileName: `${clipFileName}.mp4`,
            url,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          };
          const clipDocRef = await this.clipService.createClip(clip);
          console.log(clip);
          this.alertColor = 'green';
          this.alertMsg = '成功上傳影片，您的剪輯已發布';
          this.showPercentage = false;

          setTimeout(() => {
            this.router.navigate(['clip', clipDocRef.id]);
          }, 1000);
        },
        error: (error) => {
          this.uploadForm.enable();
          this.alertColor = 'red';
          this.alertMsg = '上傳失敗，請稍後再嘗試';
          this.inSubmission = true;
          this.showPercentage = false;
          console.log(error);
        },
      });
  }
}
