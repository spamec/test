import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerComponent } from "./components/viewer/viewer.component";
import { DocumentNotFoundComponent } from './components/document-not-found/document-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentNotFoundComponent
  }, {
    path: ':id',
    component: ViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentViewerRoutingModule {
}
