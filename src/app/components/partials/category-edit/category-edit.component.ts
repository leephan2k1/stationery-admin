import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CategoryForm } from '~/common/interfaces/category-form.interface';
import { CategoryService } from '~/services';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  imports: [ReactiveFormsModule, FormsModule],
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  standalone: true,
})
export class CategoryEditComponent {
  categoryForm: FormGroup<CategoryForm>;

  constructor(
    private readonly ctgService: CategoryService,
    private readonly toast: HotToastService
  ) {
    this.categoryForm = new FormGroup<CategoryForm>({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      parentCategory: new FormControl('', {
        nonNullable: false,
      }),
    });
  }

  submitForm() {
    console.log(this.categoryForm);
    const { name, parentCategory } = this.categoryForm.value;
    this.ctgService
      .addCategory({
        name: String(name),
        parentCategory: parentCategory ? String(parentCategory) : undefined,
      })
      .subscribe({
        next: () => {
          this.toast.success('Thêm thành công!');
          this.categoryForm.reset();
        },
      });
  }
}
