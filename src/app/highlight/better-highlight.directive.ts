import { Directive, OnInit, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {

  /**
   * renderer provide several methods to work with the DOM
   * @param renderer 
   */
  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    /**
     * setStyle need the element to work on.
     * setStyle get four parameters the native element 
     * 1) the native element
     * 2) the attribute name
     * 3) the attribute value
     * 4) flag (optional): 
     */
    this.renderer.setStyle(this.elem.nativeElement, 'color', 'blue');
  }

  /**
   * react to mouse enter event
   * @param event the event infomation 
   */
  @HostListener('mouseenter') mouseover(event: Event) {
    this.renderer.setStyle(this.elem.nativeElement, 'color', 'red');
  }

  /**
   * react to mouse leave event
   * @param event the event infomation 
   */
  @HostListener('mouseleave') mouseleave(event: Event) {
    this.renderer.setStyle(this.elem.nativeElement, 'color', 'black');
  }

}
