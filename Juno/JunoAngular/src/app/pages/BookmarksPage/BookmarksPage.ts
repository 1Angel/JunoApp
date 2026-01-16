import { ChangeDetectionStrategy, Component, inject, resource, signal } from '@angular/core';
import { BookmarkService } from '../../common/Services/BookmarkService';
import { rxResource } from '@angular/core/rxjs-interop';
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { Pagination } from '../../components/Pagination/Pagination';

@Component({
  selector: 'app-bookmarks-page',
  imports: [PropertyCard, Pagination],
  templateUrl: './BookmarksPage.html',
  styleUrl: './BookmarksPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookmarksPage {

  bookmarkService = inject(BookmarkService);

  bookmarksResource = rxResource({
    stream: ()=> this.bookmarkService.getUserBookmarks(1, 3)
  });


  toggleBookmarks(id: number){
    this.bookmarkService.toggleBookmark(id).subscribe({
      next: ()=> this.bookmarksResource.reload(),
      error: (err)=>console.log(`${err}`)
    })
  }
 }
