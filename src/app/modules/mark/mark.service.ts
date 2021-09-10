import {EventEmitter, Injectable, Output} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AddComponent} from './modals/add/add.component';

@Injectable({
  providedIn: 'root'
})
export class MarkService {
  @Output() result = new EventEmitter<any>();
  @Output() ModalClose = new EventEmitter<any>();
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {
    this.ModalClose.subscribe(() => this.bsModalRef.hide());
  }

  reloadPaginate = (data: any) => {
    this.result.emit(data);
  }

  addMark(item = {}): void {
    const initialState = {
      initData: item
    };
    this.bsModalRef = this.modalService.show(
      AddComponent,
      Object.assign({initialState}, {
        class: 'modal-request-action modal-sm modal-dialog-centered',
        ignoreBackdropClick: false
      })
    );
  }

}
