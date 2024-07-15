import { Directive, HostListener, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EditUpdate } from '../interfaces/edit-update';

@Directive({
  selector: '[dblclick-editable]'
})

export class DblclickEditableDirective {
  value: string;

  firstEdit = true;

  @Output() isEdit: EventEmitter<boolean> = new EventEmitter();

  @Input() allowEdit: boolean = true;

  @Output() onChange: EventEmitter<EditUpdate> = new EventEmitter();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }

  @HostListener("dblclick", [('$event')]) onClick(event: MouseEvent) {
    if (this.allowEdit) {
      this.makeEditable();
    }
  }

  @HostListener('blur') blurred() {
    this.checkValues();
  }

  // @ts-ignore
  @HostListener('keydown', [('$event')]) onKeydown(event) {
    if (event.keyCode === 13 && event.ctrlKey) {
      event.preventDefault();
      this.checkValues();
    }
  }

  makeEditable() {
    this.renderer.addClass(this.el.nativeElement, "editing");
    this.renderer.setAttribute(this.el.nativeElement, "contentEditable", "true");
    this.el.nativeElement.focus();
    this.setValue(this.firstEdit ? '' : this.el.nativeElement.innerText);
    this.firstEdit = false;
    this.isEdit.emit(true);
  }

  checkValues(): Observable<EditUpdate> {
    const newValue = this.el.nativeElement.innerText;

    if (this.value !== newValue) {
      const edit: EditUpdate = newValue;
      this.onChange.emit(edit);
    }
    this.reset();
    return this.onChange;
  }

  reset() {
    this.renderer.removeClass(this.el.nativeElement, "editing");
    this.renderer.setAttribute(this.el.nativeElement, "contentEditable", "false");
    this.isEdit.emit(false);
  }

  setValue(value: string): string {
    this.el.nativeElement.innerText = value;
    this.value = value;
    return this.value;
  }

}
