import { Injectable } from '@angular/core';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

@Injectable({
  providedIn: 'root',
})
export class FfmpegService {
  isReady = false;
  private ffmepg;
  constructor() {
    this.ffmepg = createFFmpeg({ log: true });
  }

  async init() {
    if (this.isReady) {
      return;
    }

    await this.ffmepg.load();
    this.isReady = true;
  }
}
