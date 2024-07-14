import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewerComponent } from "./components/viewer/viewer.component";
import { DocumentNotFoundComponent } from './components/document-not-found/document-not-found.component';
import { IdValidationGuard } from './guards/validations.service';

const routes: Routes = [
  {
    path: ':id',
    component: ViewerComponent,
    canActivate: [IdValidationGuard]
  },
  {
    path: '**',
    component: DocumentNotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentViewerRoutingModule {
}
