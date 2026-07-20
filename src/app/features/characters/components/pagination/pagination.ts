import { Component, input, output, computed } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-pagination',
  imports: [NgClass],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
})
export class Pagination {
  currentPage = input.required<number>();
  totalPages = input.required<number>();
  changePage = output<number>();

  visiblePage = computed(() => {
    const current = this.currentPage();
    const total = this.totalPages();
    let start: number = 0;
    const maxVisible = 7;
    // If there's exactly 7 page show all pages
    if (total <= maxVisible) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    // Beginning of the pagination
    if (current < 4) {
      start = 1;
    } else if (current > total - 3) {
      // End of the pagination
      start = total - maxVisible + 1;
    } else {
      // Middle of the pagination
      start = current - 3;
    }

    return Array.from({ length: maxVisible }, (_, i) => start + i);
  });

  // Specific page selected
  selectPage(page: number) {
    this.changePage.emit(page);
  }

  // Previous arrow clicked
  previousPage() {
    if (this.currentPage() === 1) {
      return;
    }
    this.changePage.emit(this.currentPage() - 1);
  }

  // Next arrow clicked
  nextPage() {
    this.changePage.emit(this.currentPage() + 1);
  }
}
