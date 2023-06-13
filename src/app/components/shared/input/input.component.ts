import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

//https://stackblitz.com/edit/angular-debounce-search?file=src%2Fapp%2Fapp.component.html,src%2Fapp%2Fapp.component.ts
@Component({
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  selector: 'app-input',
  templateUrl: './input.component.html',
  standalone: true,
})
export class InputComponent implements OnInit {
  inputValue: string = '';

  // This value will be updated only after debounce
  public debouncedInputValue = this.inputValue;

  @Input()
  placeHolder: string = '';
  @Output()
  messageEvent = new EventEmitter<string>();

  // Observable for debouncing input changes
  private searchDecouncer$: Subject<string> = new Subject();

  ngOnInit() {
    this.setupSearchDebouncer();
  }

  private setupSearchDebouncer(): void {
    // Subscribe to `searchDecouncer$` values,
    // but pipe through `debounceTime` and `distinctUntilChanged`
    this.searchDecouncer$
      .pipe(debounceTime(350), distinctUntilChanged())
      .subscribe((term: string) => {
        // Remember value after debouncing
        this.debouncedInputValue = term;

        // Do the actual search
        this.search(term);
      });
  }

  private search(term: string) {
    this.messageEvent.emit(term);
  }

  onSearchInputChange() {
    this.searchDecouncer$.next(this.inputValue);
  }
}
