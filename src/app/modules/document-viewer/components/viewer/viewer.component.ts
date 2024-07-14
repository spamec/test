import { AfterViewInit, Component, ElementRef, HostBinding, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { distinctUntilChanged, filter, map, Observable, shareReplay, switchMap } from 'rxjs';
import { Document } from '../../interfaces/document';
import { ApiService } from '../../../../services/api.service';
import { Page } from '../../interfaces/page';
import { DocumentViewerService } from '../../services/document-viewer.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: [DocumentViewerService]
})
export class ViewerComponent implements AfterViewInit, OnDestroy {
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
}
