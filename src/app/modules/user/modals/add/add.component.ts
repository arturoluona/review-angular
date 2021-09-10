import { Component, OnInit } from '@angular/core';
import {UserService} from '../../user.service';
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
  itemsMun: any;

  constructor(private formBuilder: FormBuilder,
              private rest: RestService,
              private user: UserService) { }

  ngOnInit(): void {
    this.loadData();
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      ci: ['', Validators.required],
      date_birth: ['', Validators.required],
      profession: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      gender: ['', Validators.required],
      municipalityId: ['', Validators.required]
    });
    if (Object.keys(this.initData).length) {
      this.id = this.initData.id;
      this.form.patchValue(this.initData);
    }
  }

  loadData = () => {
    this.rest.get('municipality').subscribe((res) => this.itemsMun = res);
  }

  public hideModal = () => this.user.ModalClose.emit();

  onSubmit = () => {
    const method = this.id ? 'patch' : 'post';
    this.rest[method](`user${this.id ? `/${this.id}` : ''}`, this.form.value).subscribe((res: any) => {
      this.hideModal();
      this.user.reloadPaginate(res);
    });
  }


}
