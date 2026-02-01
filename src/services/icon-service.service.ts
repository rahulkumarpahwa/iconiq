import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Icon, IconResponse } from 'src/models/icon.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IconServiceService {
  public isSearch: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false,
  );
  public isSearch$ = this.isSearch.asObservable();

  public searchWord: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public searchWord$ = this.searchWord.asObservable();

  private iconsSource = new BehaviorSubject<Icon[]>([]);
  public icons$ = this.iconsSource.asObservable();

  constructor(private http: HttpClient) {}

  setSearchWord(word: string) {
    console.log(word);
    this.searchWord.next(word);
  }

  setSearchStatus() {
    this.isSearch.next(true);
    console.log(this.isSearch);
  }

  getIconBySearch(word: string) {
    return this.http.get<IconResponse>(
      environment.familyUrl + word + '&limit=7&productTier=free&style=solid',
      {
        headers: {
          accept: 'application/json',
          'x-api-key': environment.apiKey,
        },
      },
    );
  }

  getfamilyTrendingIcons(family: string) {
    return this.http.get<IconResponse>(
      environment.familyUrl + family + '&limit=7&productTier=free&style=solid',
      {
        headers: {
          accept: 'application/json',
          'x-api-key': environment.apiKey,
        },
      },
    );
  }

  getSvgUrl(hash: string) {
    return this.http.get(environment.svgUrl + hash + '/download/svg?size=48', {
      headers: {
        'x-api-key': environment.apiKey,
      },
      responseType: 'blob',
    });
  }
}
