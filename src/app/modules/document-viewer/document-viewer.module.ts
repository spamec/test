import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ViewerComponent } from './components/viewer/viewer.component';
import { DocumentViewerRoutingModule } from "./document-viewer.routing.module";
import { DocumentNotFoundComponent } from './components/document-not-found/document-not-found.component';
import { ControlsComponent } from './components/controls/controls.component';
import { AnnotationComponent } from './components/annotation/annotation.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DblclickEditableDirective } from './directives/dblclick-editable.directive';



@NgModule({
  declarations: [
    ViewerComponent,
    DocumentNotFoundComponent,
    ControlsComponent,
    AnnotationComponent,
    DblclickEditableDirective
  ],
  imports: [
    CommonModule,
    DocumentViewerRoutingModule,
    NgOptimizedImage,
    DragDropModule
  ]
})
export class DocumentViewerModule {
}
