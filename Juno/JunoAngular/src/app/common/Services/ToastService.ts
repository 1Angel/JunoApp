import { Injectable, signal } from '@angular/core';

type Toast = {
  id: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toast = signal<Toast[]>([]);

  show(message: string){
    const id = Date.now();
    this.toast.update(x=> [{id: id, message: message}]);

    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  async remove(id: number){
    this.toast.update(t=> t.filter(x=>x.id !== id));    
  }

}
