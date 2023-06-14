import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  standalone: true,
})
export class ConfirmModalComponent {
  private id: string = '';

  @Input()
  index: string = '';

  @Output()
  messageEvent = new EventEmitter<void>();

  handleConfirm() {
    this.messageEvent.emit();
  }
}
