import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicHighLight]'
})
export class BasicHighLightDirective implements OnInit {
  /**
   * @constructor save element reference the directive sit on
   * @param elem angular inject a reference to the element this directive sit on
   */
  constructor(private elem: ElementRef) {    
  }

  ngOnInit() {
    this.elem.nativeElement.style.color = 'green';
  }
}
