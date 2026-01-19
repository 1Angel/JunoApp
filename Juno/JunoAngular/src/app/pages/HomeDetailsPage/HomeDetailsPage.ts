import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { PropertiesService } from '../../common/Services/PropertiesService';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { BathIcon, BedIcon, RulerIcon, LucideAngularModule } from 'lucide-angular';
import { Map } from "../../components/Map/Map";
import { BookmarkService } from '../../common/Services/BookmarkService';
import { Carousel } from "../../components/Carousel/Carousel";
import { AuthService } from '../../common/Services/AuthService';
import { DesignService } from '../../common/Services/DesignService';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-details-page',
  imports: [CurrencyPipe, LucideAngularModule, Map, TitleCasePipe, Carousel],
  templateUrl: './HomeDetailsPage.html',
  styleUrl: './HomeDetailsPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeDetailsPage implements OnInit{
  ngOnInit(): void {

    this.route.params.subscribe((params)=>{
      this.propertyId.set(params['id']);
    });

    this.getProperty();
    this.setMetadata();
  }

  private readonly service = inject(PropertiesService);
  private readonly bookmarkService = inject(BookmarkService);
  private readonly authService = inject(AuthService);
  private readonly designService = inject(DesignService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  title = inject(Title);
  metadata =  inject(Meta);

  isMobile = computed(()=> this.designService.smallScreen());
  isAuthenticated = computed(()=> this.authService.isLoggedIn());

  //@ts-ignore
  property = signal<Properties>();
  propertyId =signal('');

  getProperty(){
    this.service.getProperty(Number(this.propertyId())).subscribe((res)=>{
      this.property.set(res);
      this.title.setTitle(`${res.address.street}, ${res.address.city} - Juno!`);
    });
  }
  
  toggleBookmark(id: number){
    if(this.isAuthenticated()){
          this.bookmarkService.toggleBookmark(id).subscribe({
      next: ()=> this.getProperty(),
    })
    }else{
      this.router.navigateByUrl('/auth/login')
    }
  }

  copyLink(){
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl);
    console.log(`copiao ${currentUrl}`);

  } 
  
  effecto = effect(()=> {
    console.log(`esta cambiando ${this.isMobile()}`)
  })

  setMetadata(){
    this.metadata.addTag({name: "description", content: "Details of the house"});
        this.metadata.addTag({name: "description", content: "Details of the house"});
  }

  //icons
  bedIcon = BedIcon;
  bathIcon = BathIcon;
  ruler = RulerIcon;
 }
