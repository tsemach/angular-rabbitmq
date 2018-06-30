import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appGreenHighLight]'
})
export class HighLightGreenDirective implements OnInit {
  /**
   * @constructor save element reference the directive sit on
   * @param elem angular inject a reference to the element this directive sit on
   */
  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    //this.elem.nativeElement.style.color = 'green';
    /**
     * setStyle need the element to work on.
     * setStyle get four parameters the native element
     * 1) the native element
     * 2) the attribute name
     * 3) the attribute value
     * 4) flag (optional):
     */
    this.renderer.setStyle(this.elem.nativeElement, 'color', 'green');
  }
}
