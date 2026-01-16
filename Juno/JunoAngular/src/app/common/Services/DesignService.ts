import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, HostListener, inject, Injectable, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

var MOBILE_WIDTH = 768;


@Injectable({
  providedIn: 'root'
})
export class DesignService{

  private readonly breakPoint = inject(BreakpointObserver);
  
  private readonly small = '(max-width: 600px)';

  private readonly screenWidth = toSignal(this.breakPoint.observe([this.small]));

  smallScreen = computed(()=> this.screenWidth()?.breakpoints[this.small]);

}
