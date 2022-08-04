import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Observable } from 'rxjs';

import { Cat } from '../shared/cat.model';

@Injectable({ providedIn: 'root' })
export class CatService {

    private readonly basicCatUrl: string = 'https://api.thecatapi.com/v1/';

    private _currentCatsSubject: BehaviorSubject<Cat[]>;
    private _currentCats$: Observable<Cat[]>;

    public filterSubject: BehaviorSubject<string>;
    public filter$: Observable<string>;

    constructor(private _http: HttpClient) {
        this._currentCatsSubject = new BehaviorSubject<Cat[]>([]);
        this._currentCats$ = this._currentCatsSubject.asObservable();

        this.filterSubject = new BehaviorSubject<string>('');
        this.filter$ = this.filterSubject.asObservable();
    }

    public get cats$(): Observable<Cat[]> {
        return this.filter$.pipe(
            mergeMap((searchVal) => {
                return this._currentCats$.pipe(map((cats) => {
                    return cats.filter((cat) => cat?.breed?.toLowerCase()?.indexOf(searchVal) >= 0);
                }));
            })
        )
    }

    getCatImages(catNumber: number): void {
        this._http.get<any>(this.basicCatUrl + 'images/search?limit=' + catNumber + '&has_breeds=1')
            .subscribe((response) => {
                const cats: Cat[] = [];

                for (const cat of response) {
                    cats.push({ breed: cat?.breeds[0]?.name?.toLowerCase(), imgSrc: cat.url });
                }

                this._currentCatsSubject.next(cats);
            });
    }
}