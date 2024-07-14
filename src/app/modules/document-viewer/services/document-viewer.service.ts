import { Injectable } from '@angular/core';
import { DocumentViewerRoutingModule } from '../document-viewer.routing.module';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentViewerService {
  private zoomSubject$: BehaviorSubject<number> = new BehaviorSubject<number>(1);

  zoom$: Observable<number> = this.zoomSubject$.pipe(
    distinctUntilChanged(),
    shareReplay(1)
  );

  constructor() {
  }

  get zoom(): number {
    return this.zoomSubject$.value;
  }

  set zoom(value: number) {
    this.zoomSubject$.next(value);
  }
}
