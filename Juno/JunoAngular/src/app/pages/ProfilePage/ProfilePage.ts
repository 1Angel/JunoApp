import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PropertiesService } from '../../common/Services/PropertiesService';
import { PropertyCard } from "../../components/PropertyCard/PropertyCard";
import { AuthService } from '../../common/Services/AuthService';
import { RouterLink } from "@angular/router";
import { BookmarkService } from '../../common/Services/BookmarkService';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile-page',
  imports: [PropertyCard, RouterLink, TitleCasePipe],
  templateUrl: './ProfilePage.html',
  styleUrl: './ProfilePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit{
  ngOnInit(): void {
    this.getProperties();
    this.getUserProfile();
    this.getBookmarks();
  }

  propertyService = inject(PropertiesService);
  userService = inject(AuthService);
  bookmarkService = inject(BookmarkService);

  properties = signal<Properties[]>([]);
  bookmarks = signal<Properties[]>([]);
  user = signal<User>({
    email: '',
    first_name: '',
    id: '',
    last_name: ''
  });

  getProperties(){
    this.propertyService.getPropertiesByUser(1, 3).subscribe(res=>{
      this.properties.set(res.results)
    });
  }

  getBookmarks(){
    this.bookmarkService.getUserBookmarks(1,  3).subscribe(res=>{
      this.bookmarks.set(res.results)
    });
  }

  getUserProfile(){
    this.userService.CurrentUser().subscribe(res=>{
      this.user.set(res)
    });
  }


 }
