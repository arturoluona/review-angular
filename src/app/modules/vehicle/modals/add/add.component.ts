import { Component, OnInit } from '@angular/core';
import {VehicleService} from '../../vehicle.service';
import {RestService} from '../../../../rest.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  faTimes = faTimes;
  form: FormGroup;
  id = null;
  initData: any;
  itemsMark: any;
  itemsUser: any;

  constructor(private formBuilder: FormBuilder,
              private rest: RestService,
              private vehicle: VehicleService) { }

  ngOnInit(): void {
    this.loadData();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      markId: ['', Validators.required],
      userId: ['', Validators.required]
    });
    if (Object.keys(this.initData).length) {
      this.id = this.initData.id;
      this.form.patchValue(this.initData);
    }
  }

  loadData = () => {
    this.rest.get('mark').subscribe((res) => this.itemsMark = res);
    this.rest.get('user').subscribe((res) => this.itemsUser = res);
  }

  public hideModal = () => this.vehicle.ModalClose.emit();

  onSubmit = () => {
    const method = this.id ? 'patch' : 'post';
    this.rest[method](`vehicle${this.id ? `/${this.id}` : ''}`, this.form.value).subscribe((res: any) => {
      this.hideModal();
      this.vehicle.reloadPaginate(res);
    });
  }


}
