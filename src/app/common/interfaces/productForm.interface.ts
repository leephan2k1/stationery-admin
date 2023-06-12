import { FormControl } from '@angular/forms';

export interface ProductForm {
  name: FormControl<string>;
  thumbnail: FormControl<string>;
  size: FormControl<string>;
  weight: FormControl<number>;
  price: FormControl<number>;
  category: FormControl<string>;
  supplier: FormControl<string>;
  brand: FormControl<string>;
  discount_percent: FormControl<number>;
  description: FormControl<string>;
  specific_properties?: FormControl<object>;
}
