import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Thought } from 'src/app/models/models';
import { BackendService } from 'src/app/services/backend.service';
import { Web3Service } from 'src/app/services/web3.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
})
export class InputComponent implements OnInit {
  maxInputCharCount: number;
  form!: FormGroup;
  @ViewChild('formDirective') private formDirective!: NgForm;

  constructor(
    private fb: FormBuilder,
    private beSvc: BackendService,
    private web3Svc: Web3Service
  ) {
    this.maxInputCharCount = 140;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      input: this.fb.control('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(140),
      ]),
    });
  }

  resetInput(): void {
    this.form.reset('');
  }

  sendInput(): void {
    let obj = {
      message: this.form.controls['input'].value,
    };
    console.log('Sending to server');
    this.beSvc
      .sendMessage(obj, this.web3Svc.getWalletAddress())
      .then((response) => {
        this.form.reset('');
        this.formDirective.resetForm();
        this.updateArray.emit(response);
      });
  }

  @Output() updateArray = new EventEmitter<Thought[]>();
}
