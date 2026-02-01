import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { IconServiceService } from 'src/services/icon-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent implements OnInit, OnDestroy {
  public iconName: string = '';
  public isSearch: boolean = false;
  iconService: IconServiceService = inject(IconServiceService);
  private subscriptions: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.iconService.isSearch$.subscribe((value) => {
        this.isSearch = value;
        if (!value) {
          this.iconName = '';
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  handleSearch(): void {
    if (this.iconName.trim()) {
      this.iconService.setSearchWord(this.iconName.trim());
      this.iconService.setSearchStatus();
    }
  }

  handleKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleCross(): void {
    this.iconName = '';
    this.iconService.isSearch.next(false);
    this.iconService.searchWord.next('');
  }
}
