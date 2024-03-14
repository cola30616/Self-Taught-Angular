import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  DoCheck,
  SimpleChanges,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnChanges, DoCheck {
  @Input('img') postImg = '';
  @Output() imgSelected = new EventEmitter<string>();
  constructor() {
    console.log('constructor called', this.postImg);
  }

  ngOnInit(): void {
    console.log('ngOnInit() Called', this.postImg);
  }

  // 更改數據就會執行
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges() called');
  }
  // 如果沒辦法正常渲染，就會用它，但是很少用
  ngDoCheck(): void {
    console.log('ngDoCheck() called');
  }
  // 在projection Content 改變後執行
  ngAfterContentChecked(): void {
    //Called after every check of the component's or directive's content.
    //Add 'implements AfterContentChecked' to the class.
    console.log('ngAfterContentChecked');
  }
  // 在projection Content 載入後執行
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log('ngAfterContentInit');
  }

  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log('ngAfterViewChecked');
  }
  //component 載入後執行
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('ngOnDestroy');
  }
}
