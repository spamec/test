import { Injectable } from '@angular/core';
import { DocumentViewerRoutingModule } from '../document-viewer.routing.module';
import { BehaviorSubject, distinctUntilChanged, Observable, ReplaySubject, shareReplay } from 'rxjs';
import { Annotation } from '../interfaces/annotation';
import { CdkDrag, DragRef } from '@angular/cdk/drag-drop';

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

  annotationsSubject$: BehaviorSubject<Annotation[]> = new BehaviorSubject<Annotation[]>([]);
  annotations$: Observable<Annotation[]> = this.annotationsSubject$.pipe(
    shareReplay(1)
  );

  changeAnnotations(annotation: Annotation, index?: number){
    const currentAnnotations =  this.annotationsSubject$.value;
    if(index !== undefined){
      const target: Annotation = currentAnnotations[index];
      if(!target){
        return;
      }
      currentAnnotations[index] = annotation;
      this.annotationsSubject$.next(currentAnnotations);
    }else{
      this.annotationsSubject$.next([...currentAnnotations, annotation])
    }
  }


  removeAnnotation(index?: number){
    if(index === undefined || index === null){
      return;
    }
    const currentAnnotations =  this.annotationsSubject$.value;
    const target: Annotation = currentAnnotations[index];
    if(!target){
      return;
    }
    currentAnnotations.splice(index, 1)
  }

  moveAnnotation(index: number, position: {x: number; y: number}, dragSource: DragRef<CdkDrag<any>>){
    if(index === undefined || index === null){
      return;
    }
    const currentAnnotations =  this.annotationsSubject$.value;
    const target: Annotation = currentAnnotations[index];
    if(!target){
      return;
    }
    const annotation: Annotation = {...target, position: {x: target.position.x + position.x, y: target.position.y + position.y}};
    this.changeAnnotations(annotation, index);
    dragSource.reset();

  }
}
