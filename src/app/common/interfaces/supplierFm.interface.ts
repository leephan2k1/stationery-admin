import { FormControl } from '@angular/forms';

export interface SupplierFm {
  name: FormControl<string>;
  country: FormControl<string>;
}
