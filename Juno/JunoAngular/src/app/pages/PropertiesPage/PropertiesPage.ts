import { ChangeDetectionStrategy, Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PropertiesService } from '../../common/Services/PropertiesService';
import { PropertyCard } from '../../components/PropertyCard/PropertyCard';
import { rxResource, takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination } from "../../components/Pagination/Pagination";
import { map } from 'rxjs';
import { PropertyCardSkeleton } from '../../components/PropertyCardSkeleton/PropertyCardSkeleton';
import { HomeStatusFilter } from '../../components/HomeStatusFilter/HomeStatusFilter';
import { BookmarkService } from '../../common/Services/BookmarkService';

@Component({
  selector: 'app-properties-page',
  imports: [PropertyCard, Pagination, PropertyCardSkeleton, HomeStatusFilter],
  templateUrl: './PropertiesPage.html',
  styleUrl: './PropertiesPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesPage implements OnInit {

  ngOnInit(): void {
    this.setMetaData();
  }

  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly propertyService = inject(PropertiesService);
  private readonly bookmarkService = inject(BookmarkService);

  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => +params.get('page')!)
    ), {
    initialValue: 1
  }
  );

  homeStatus = toSignal(
    this.route.queryParamMap.pipe(
      map((params) => params.get('homestatus')!)
    ), {
    initialValue: "FOR_RENT"
  }
  );

  propertiesResource = rxResource<PropertiesResponse, { page: number, homeStatus: string }>({
    params: () => ({ page: this.currentPage(), homeStatus: this.homeStatus() }),
    stream: ({ params }) => this.propertyService.getProperties(params.homeStatus, params.page, 9),
  });


  bookmarkProperty(id: number) {
    this.bookmarkService.toggleBookmark(id).subscribe({
      next: () => {
        console.log(`bookmarked`),
          this.propertiesResource.reload()
      },
      error: (err) => console.log(`${err}`)
    });
  }

  updatePageParam(page: number) {
    this.router.navigate([], {
      queryParams: {
        page: page
      },
      queryParamsHandling: "merge"
    });
  }

  updateHomeStatusParam(status: string) {
    this.router.navigate([], {
      queryParams: {
        page: 1,
        homestatus: status
      }
    });
  }

  setMetaData() {
    this.title.setTitle("Properties - Juno!");
    this.meta.addTag({ name: "title", content: "Properties - Juno!" });
    this.meta.addTag({ name: "og:title", content: "Properties - Juno!" });
    this.meta.addTag({ name: "description", content: "Search properties near you!" });
    this.meta.addTag({ name: "og:description", content: "Search properties near you!" });
  }

}
