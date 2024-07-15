import { Component, EventEmitter, HostBinding, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { EditUpdate } from '../../interfaces/edit-update';

const DIV_PLACEHOLDER = 'Double click to edit. Ctrl+Enter to save.';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.scss']
})
export class AnnotationComponent implements OnInit{
  @Output() onEditChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onUpdateText: EventEmitter<string> = new EventEmitter();
  @Output() onUpdateImage: EventEmitter<string | ArrayBuffer | null> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  @Input()
  @HostBinding('style.--left.px')
  left: number = 0;

  @Input()
  @HostBinding('style.--top.px')
  top: number = 0;

  @Input()
  text: string | undefined;

  @Input()
  image: any;

  constructor(private viewContainerRef: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.text = this.text ?? DIV_PLACEHOLDER;
  }

  selectedImage($event: any) {
    const file = $event.target.files[0];
    if(!!file){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.onUpdateImage.emit(reader.result)
      };
    }
  }
}
