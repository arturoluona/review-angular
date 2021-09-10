import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../rest.service';
import {MarkService} from '../../mark.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  items = [];
  listSubscribers = [];
  faEdit = faEdit; faTrashAlt = faTrashAlt;
  constructor(private rest: RestService, private mark: MarkService) { }

  ngOnInit(): void {
    this.loadData();
    this.listener$();
  }

  listener$ = () => {
    const observer1$ = this.mark.result.subscribe(() => this.loadData());
    this.listSubscribers.push(observer1$);
  }

  loadData = () => {
    this.rest.get('mark').subscribe((res) => this.items = res);
  }

  openModal = () => {
    this.mark.addMark();
  }

  openModalEdit = ({id, name}) => {
    this.mark.addMark({id, name});
  }

  deleteItem = ({id}) => {
    this.rest.delete(`mark/${id}`).subscribe(() => this.loadData());
  }

  ngOnDestroy = (): void => {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe());
  }
}
