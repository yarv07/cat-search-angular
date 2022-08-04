import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { FiltersComponent } from './filters/filters.component';

const material = [
    MatInputModule
];

@NgModule({
    declarations: [FiltersComponent],
    imports: [FormsModule, ReactiveFormsModule, material],
    exports: [FiltersComponent]
})
export class FiltersModule { }