import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ToastService } from '../../common/Services/ToastService';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './Toast.html',
  styleUrl: './Toast.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Toast{

  toastService = inject(ToastService);

  toast = computed(()=> this.toastService.toast());

  close(id: number){
    this.toastService.remove(id);
  }
}
