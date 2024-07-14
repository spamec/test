import { Component } from '@angular/core';
import { DocumentViewerService } from '../../services/document-viewer.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  private delta = 1.1;
  zoomIn() {
    this.documentViewerService.zoom = this.documentViewerService.zoom * this.delta;
  }

  zoomOut() {
    this.documentViewerService.zoom = this.documentViewerService.zoom / this.delta;
  }

  constructor(private documentViewerService: DocumentViewerService) {
  }
}
