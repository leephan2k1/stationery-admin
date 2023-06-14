import { FormControl } from '@angular/forms';

export interface WhForm {
  name: FormControl<string>;
  location: FormControl<string>;
}

export interface AddProductToWh {
  warehouseId: FormControl<string>;
  sku: FormControl<string>;
  quantity: FormControl<number>;
}
