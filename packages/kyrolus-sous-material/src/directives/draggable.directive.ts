import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';
export type Draggable = { isDraggable: boolean; reset: boolean };

@Directive({
  selector: '[ksDraggable]',
})
export class DraggableDirective {
  ksDraggable = input<Draggable>({ isDraggable: true, reset: false });
  el = inject(ElementRef);
  isDragging = signal<boolean>(false);
  reset = signal<boolean>(false);
  private readonly elementPosition = signal<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  private readonly startPosition = signal<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  @HostListener('pointerdown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (!this.ksDraggable() || event.button !== 0) return;
    if (this.ksDraggable() && event.button === 0) {
      this.isDragging.set(true);
      this.startPosition.set({
        x: event.clientX - this.elementPosition().x,
        y: event.clientY - this.elementPosition().y,
      });
      this.el.nativeElement.style.cursor = 'move';
    }
  }
  @HostListener('document:pointermove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (!this.isDragging()) return;
    this.elementPosition.set({
      x: event.clientX - this.startPosition().x,
      y: event.clientY - this.startPosition().y,
    });
    this.el.nativeElement.style.transform = `translate(${
      this.elementPosition().x
    }px, ${this.elementPosition().y}px)`;
  }
  @HostListener('document:pointerup', ['$event'])
  onMouseUp() {
    if (!this.isDragging()) return;
    this.isDragging.set(false);
    this.el.nativeElement.style.cursor = 'default';

    if (this.reset()) {
      this.elementPosition.set({ x: 0, y: 0 });
      this.el.nativeElement.style.transform = `translate(0px, 0px)`;
    }
  }
}
