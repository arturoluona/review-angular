import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../rest.service';
import {UserService} from '../../user.service';
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
  constructor(private rest: RestService, private user: UserService) { }

  ngOnInit(): void {
    this.loadData();
    this.listener$();
  }

  listener$ = () => {
    const observer1$ = this.user.result.subscribe(() => this.loadData());
    this.listSubscribers.push(observer1$);
  }

  loadData = () => {
    this.rest.get('user').subscribe((res) => this.items = res);
  }

  openModal = () => {
    this.user.addUser();
  }

  openModalEdit = (item) => {
    this.user.addUser(item);
  }

  deleteItem = ({id}) => {
    this.rest.delete(`user/${id}`).subscribe(() => this.loadData());
  }

  ngOnDestroy = (): void => {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe());
  }
}
