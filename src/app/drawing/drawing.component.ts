import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators'

@Component({
  selector: 'app-drawing',
  templateUrl: './drawing.component.html',
  styleUrls: ['./drawing.component.scss']
})
export class DrawingComponent implements OnInit {

  @ViewChild('canvas', { static: false }) public canvas: ElementRef;

  private cx: CanvasRenderingContext2D;
  inMemCanvas = this.renderer.createElement('canvas');
  inMemCtx = this.inMemCanvas.getContext('2d');

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
  }

  public ngAfterViewInit() {
    this._setCanvasSize();

    window.addEventListener('resize', () => {
      this.inMemCanvas.width = this.canvas.nativeElement.width;
      this.inMemCanvas.height = this.canvas.nativeElement.height;
      this.inMemCtx.drawImage(this.canvas.nativeElement, 0, 0);
      this._setCanvasSize();
      this._setDefaultForCx();
      this.cx.drawImage(this.inMemCanvas, 0, 0);
    });

    this.cx = this.canvas.nativeElement.getContext('2d');

    this._setDefaultForCx();

    this._captureEvents(this.canvas.nativeElement);
  }

  private _setDefaultForCx() {
    this.cx.lineWidth = 10;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#3f51b5';
  }

  private _setCanvasSize() {
    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight - 100;
  }

  private _captureEvents(canvasEl: HTMLCanvasElement) {
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          return fromEvent(canvasEl, 'mousemove')
            .pipe(
              takeUntil(fromEvent(canvasEl, 'mouseup')),
              takeUntil(fromEvent(canvasEl, 'mouseleave')),
              pairwise()
            )
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };
        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.draw(prevPos, currentPos);
      });
  }

  private draw(prevPos: { x: number, y: number }, currentPos: { x: number, y: number }) {
    if (!this.cx) return;

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
    this.cx.drawImage(this.canvas.nativeElement, 0, 0);
  }

}
