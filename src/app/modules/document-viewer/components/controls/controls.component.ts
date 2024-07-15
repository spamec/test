import { Component, EventEmitter, Output } from '@angular/core';
import { DocumentViewerService } from '../../services/document-viewer.service';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent {
  @Output() onSaveDocument: EventEmitter<void> = new EventEmitter();

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
