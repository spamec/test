import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, combineLatest, distinctUntilChanged, filter, map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { Document } from '../../interfaces/document';
import { ApiService } from '../../../../services/api.service';
import { Page } from '../../interfaces/page';
import { DocumentViewerService } from '../../services/document-viewer.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Annotation } from '../../interfaces/annotation';
import { CdkDrag, CdkDragEnd, DragRef } from '@angular/cdk/drag-drop';
import * as uuid from 'uuid';

@UntilDestroy()
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [DocumentViewerService]
})
export class ViewerComponent implements AfterViewInit, OnDestroy {
  // @ts-ignore
  @HostListener("dblclick", ['$event']) onClick($event: MouseEvent){
    $event.stopPropagation();
    const element: HTMLElement = $event.target as HTMLElement;
    if (element.classList.contains('document-pages')) {
      this.documentViewerService.changeAnnotations({
        id: uuid.v4(),
        position:{
          x: $event.offsetX,
          y: $event.offsetY
        }
      })
    }
  }


  @HostBinding('style.--zoom')
  zoom: number = this.documentViewerService.zoom;

  // @ts-ignore
  @ViewChild('wrapper') wrapper: ElementRef<HTMLDivElement>;

  // @ts-ignore
  initialHeight: number;

  documentId$: Observable<string> = this.route.params.pipe(
    map(params => String(params['id'])),
    distinctUntilChanged(),
    shareReplay(1)
  );

  document$: Observable<Document> = this.documentId$.pipe(
    switchMap(id => this.apiService.getDocument(id)),
    distinctUntilChanged(),
    shareReplay(1)
  )

  pages$: Observable<Page[]> = this.document$.pipe(
    map(document => document?.pages?.sort((a, b) => a.number >= b.number ? 1 : -1)),
    distinctUntilChanged(),
    shareReplay(1)
  )

  zoom$: Observable<number> = this.documentViewerService.zoom$;

  annotations$: Observable<Annotation[]> = this.documentViewerService.annotations$;
  someAnnotationInEditSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
  trackById(_: any, annotation: Annotation){
    return annotation.id;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private documentViewerService: DocumentViewerService
  ) {
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit(): void {
    this.document$.pipe(
      filter(document => document === undefined || document === null),
      switchMap(() => this.router.navigate(['/', 'document'])),
      untilDestroyed(this)
    ).subscribe()

    this.zoom$.pipe(
      untilDestroyed(this)
    ).subscribe(zoom => {
      this.zoom = zoom;
      const wrapper = this.wrapper?.nativeElement;
      if (!!wrapper) {
        if (!this.initialHeight) {
          this.initialHeight = wrapper.offsetHeight;
        }
        wrapper.style.height = (this.initialHeight * zoom) + 'px';
      }
    })
  }

  removeAnnotation(cdkindex: number) {

    this.documentViewerService.removeAnnotation(cdkindex)
  }

  dragEnd($event: CdkDragEnd, index: number) {
    const dragSource: DragRef<CdkDrag<any>> = $event.source._dragRef;
    this.documentViewerService.moveAnnotation(index, $event.distance, dragSource)
  }

  updateText(text: string, annotation: Annotation, index: number) {
    this.documentViewerService.changeAnnotations({...annotation, text}, index)
  }

  updateImage(img: string | ArrayBuffer | null, annotation: Annotation, index: number) {
    if(!!img){
      this.documentViewerService.changeAnnotations({...annotation, img}, index)
    }
  }

  saveDocument() {
    combineLatest([this.document$, this.annotations$]).pipe(
      take(1),
      map(([document, annotations])=>{
        console.log({...document, annotations} as Document)
      })
    ).subscribe()
  }
}
