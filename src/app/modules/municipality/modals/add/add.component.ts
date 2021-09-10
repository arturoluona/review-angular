import { Component, OnInit } from '@angular/core';
import {MunicipalityService} from '../../municipality.service';
import {RestService} from '../../../../rest.service';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
              private municipality: MunicipalityService) { }

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

  public hideModal = () => this.municipality.ModalClose.emit();

  onSubmit = () => {
    const method = this.id ? 'patch' : 'post';
    this.rest[method](`municipality${this.id ? `/${this.id}` : ''}`, this.form.value).subscribe((res: any) => {
      this.hideModal();
      this.municipality.reloadPaginate(res);
    });
  }


}
