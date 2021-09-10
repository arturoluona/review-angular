import { Component, OnInit } from '@angular/core';
import {MarkService} from '../../mark.service';
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

  constructor(private formBuilder: FormBuilder,
              private rest: RestService,
              private mark: MarkService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });
    if (Object.keys(this.initData).length) {
      this.id = this.initData.id;
      this.form.patchValue({
        name: this.initData.name
      });
    }
  }

  public hideModal = () => this.mark.ModalClose.emit();

  onSubmit = () => {
    const method = this.id ? 'patch' : 'post';
    this.rest[method](`mark${this.id ? `/${this.id}` : ''}`, this.form.value).subscribe((res: any) => {
      this.hideModal();
      this.mark.reloadPaginate(res);
    });
  }


}
