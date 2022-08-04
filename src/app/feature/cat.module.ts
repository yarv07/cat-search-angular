import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CatComponent } from './cat/cat.component';

@NgModule({
    declarations: [CatComponent],
    imports: [CommonModule],
    exports: [CatComponent]
})
export class CatModule {}