import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { PostComponent } from './app/components/post/post.component';}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

