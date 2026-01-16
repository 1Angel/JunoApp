import { ChangeDetectionStrategy, Component, computed, effect, input, model, output, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './Pagination.html',
  styleUrl: './Pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pagination {

  currentPage = input<number>(1);
  pageSize = input.required<number>();
  total = input.required<number>();

  activePage = output<number>();

  totalPages = computed(() => Math.ceil(this.total() / this.pageSize()));

  getPages = computed(() => {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  });

  setActivePage(page: number){
    this.activePage.emit(page);
  }

}
