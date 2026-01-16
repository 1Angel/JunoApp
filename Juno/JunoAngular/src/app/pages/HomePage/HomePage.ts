import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { AuthService } from '../../common/Services/AuthService';
import { Map } from "../../components/Map/Map";

@Component({
  selector: 'app-home-page',
  imports: [Map],
  templateUrl: './HomePage.html',
  styleUrl: './HomePage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
 }
