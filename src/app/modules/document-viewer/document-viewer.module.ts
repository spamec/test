import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './components/viewer/viewer.component';
import { DocumentViewerRoutingModule } from "./document-viewer.routing.module";
import { DocumentNotFoundComponent } from './components/document-not-found/document-not-found.component';


@NgModule({
  declarations: [
    ViewerComponent,
    DocumentNotFoundComponent
  ],
  imports: [
    CommonModule,
    DocumentViewerRoutingModule
  ]
})
export class DocumentViewerModule {
}
