import { FormControl } from '@angular/forms';

export interface CategoryForm {
  name: FormControl<string>;
  parentCategory?: FormControl<string | null>;
}
