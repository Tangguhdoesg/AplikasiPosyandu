import { Component } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subject, takeUntil } from 'rxjs';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent {
  destroySubject$: Subject<void> = new Subject();
  id: number = -1;
  constructor(public modalRef: MdbModalRef<DeleteUserModalComponent>,
              private service: AppServiceService) {}

  onDelete() {
    this.service.deleteUser(this.id)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe(data => {
        console.log(data);
        this.modalRef.close(); 
      }, err => {
        // this.modalRef.close(); 
      })
  }
}
