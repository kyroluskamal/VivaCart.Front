import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostBinding,
  input,
  model,
  output,
  ɵSafeValue,
} from '@angular/core';
import { Icon, SideBarPosition } from '../helpers/types';
import { RendererService } from '../services/renderer.service';
import { ThrowingErrorService } from '../services/throwing-error.service';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { GoogleIconDirective } from '../directives/google-icon.directive';
import { IconDirective } from '../directives/icon.directive';

@Component({
  selector: 'ks-side-nav',
  imports: [NgClass, GoogleIconDirective, IconDirective, NgOptimizedImage],
  template: `
    <div
      class="w-100"
      [ngClass]="position() == 'left' ? 'flex-row-reverse' : 'flex-row'"
      [class.flex-column]="useCloseBtn()"
    >
      @if(useCloseBtn() && logo()==""){
      <div class="d-flex f-justify-content-end ">
        <button>
          @if(closeIcon().type == 'google'){
          <span
            ksGoogleIcon
            (click)="open.set(false)"
            [class]="closeBtnClasses()"
            >{{ closeIcon().icon }}</span
          >
          }@else{
          <span
            [ksIcon]="closeIcon().icon"
            [iconType]="closeIcon()"
            [class]="closeBtnClasses()"
            (click)="open.set(false)"
          ></span>
          }
        </button>
      </div>
      } @if(logo()!=""){
      <div
        class="navbar-height p-1 d-flex f-justify-content-center br-b-dark-38 br-w-b-2 br-s-solid br-b-only"
      >
        <img [ngSrc]="logo()" alt="logo" width="50" height="50" />
      </div>
      }
      <ng-content></ng-content>
    </div>
  `,
  host: { class: 'h-100 position-fixed sidenav-toggle top-0 left-0 z-1' },
  styles: `
      :host {
        transition: transform var(--transition-duration) var(--transition-easing);
        width: var(--sidebar-width);
      }
    `,
})
export class SideNavComponent implements AfterViewInit {
  position = input<SideBarPosition>('left');
  open = model<boolean>(true);
  closeIcon = input<Icon>({
    type: 'google',
    icon: 'close',
  });
  closeBtnClasses = input<string>('btn aspect-ratio-1x1 br-full text-danger');
  useCloseBtn = input<boolean>(false);
  logo = input<string | ɵSafeValue>('');
  //-------------------------Outputs-------------------------
  openChange = output<boolean>();
  effect = effect(() => {
    this.openChange.emit(this.open());
  });
  constructor(
    private readonly renderService: RendererService,
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly throwErrorService: ThrowingErrorService
  ) {}
  ngAfterViewInit(): void {
    let layout = this.renderService.selectRoot('ks-dashboard-layout');
    if (layout) {
      this.throwErrorService.isChildOf(
        layout.getAttribute('ng-reflect-sidebar-mode') == 'side'
          ? this.elementRef.nativeElement
          : (this.elementRef.nativeElement.parentElement as HTMLElement),
        'ks-dashboard-layout',
        'KS-SIDE-NAV should be a child of KS-DASHBOARD-LAYOUT'
      );
    }
  }
  // @HostBinding('style')
  // get style() {
  //   return {
  //     [this.position()]: this.open()
  //       ? '0'
  //       : `-${this.elementRef.nativeElement.offsetWidth}px`,
  //   };
  // }

  @HostBinding('attr.opened')
  get isOpened() {
    return this.open();
  }
}
