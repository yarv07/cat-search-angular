import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  catCount: number = 10;
  catBreed: string;

  filter: FormControl;
  filter$: Observable<string>;

  constructor(private _catService: CatService) {
    this.filter = new FormControl('');
    this.filter$ = this.filter.valueChanges;
  }

  ngOnInit(): void {
    this.filter$.subscribe(val => {
      this._catService.filterSubject.next(val);
    });
  }

  search(): void {
    this._catService.getCatImages(this.catCount);
  }
}
