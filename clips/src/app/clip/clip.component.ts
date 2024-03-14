import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
})
export class ClipComponent implements OnInit {
  id = '';
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {
    // 如果點擊其他的clip，讓id 能夠正確更新
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
  }
}
