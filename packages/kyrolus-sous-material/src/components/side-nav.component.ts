import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  HostBinding,
  input,
  model,
  output,
} from '@angular/core';
import { Icon, SideBarMode, SideBarPosition } from '../helpers/types';
import { RendererService } from '../services/renderer.service';
import { ThrowingErrorService } from '../services/throwing-error.service';
import { NgClass } from '@angular/common';
import { GoogleIconDirective } from '../directives/google-icon.directive';
import { IconDirective } from '../directives/icon.directive';

@Component({
  selector: 'ks-side-nav',
  imports: [NgClass, GoogleIconDirective, IconDirective],
  template: `
    <div
      class="w-100 bg-white d-flex"
      [ngClass]="position() == 'left' ? 'flex-row-reverse' : 'flex-row'"
      [class.flex-column]="useCloseBtn()"
    >
      @if(useCloseBtn()){
      <div class="d-flex f-justify-content-end">
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
      }
      <ng-content></ng-content>
    </div>
  `,
  host: { class: 'h-100 position-absolute' },
  styles: [],
})
export class SideNavComponent implements AfterViewInit {
  position = input<SideBarPosition>('left');
  open = model<boolean>(true);
  closeIcon = input<Icon>({
    type: 'google',
    icon: 'close',
  });
  closeBtnClasses = input<string>('btn aspect-ratio-1x1 br-full text-danger');
  useCloseBtn = input<boolean>(true);

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
  @HostBinding('style')
  get style() {
    return {
      [this.position()]: this.open()
        ? '0'
        : `-${this.elementRef.nativeElement.offsetWidth}px`,
    };
  }

  @HostBinding('attr.opened')
  get isOpened() {
    return this.open();
  }
}
