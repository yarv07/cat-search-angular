import { Component, OnInit } from '@angular/core';

import { CatService } from 'src/app/services/cat.service';
import { Cat } from 'src/app/shared/cat.model';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  cats: Cat[] = [];

  constructor(private _catService: CatService) { }

  ngOnInit(): void {
    this._catService.cats$.subscribe(cats => {
      this.cats = cats;
    });
  }
}
