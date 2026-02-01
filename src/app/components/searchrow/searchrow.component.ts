import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Icon } from 'src/models/icon.model';
import { IconServiceService } from 'src/services/icon-service.service';

@Component({
  selector: 'app-searchrow',
  templateUrl: './searchrow.component.html',
})
export class SearchrowComponent implements OnInit, OnChanges {
  @Input() heading: string = '';
  iconsArray: Icon[] = [];

  constructor(private iconService: IconServiceService) {}

  ngOnInit() {
    this.fetchIcons();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['heading']) {
      this.fetchIcons();
    }
  }

  fetchIcons() {
    if (this.heading !== '') {
      this.iconService.getIconBySearch(this.heading).subscribe({
        next: (response) => {
          this.iconsArray = response.results;
        },
        error: (err) => {
          console.error('API Error:', err);
        },
      });
    }
  }

  handleSearchWindowCloseButton() {
    this.iconService.isSearch.next(false);
    this.iconService.searchWord.next('');
  }
}
