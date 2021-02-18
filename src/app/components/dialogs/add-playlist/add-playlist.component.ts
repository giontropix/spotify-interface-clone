import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-playlist',
  templateUrl: './add-playlist.component.html',
  styleUrls: ['./add-playlist.component.css']
})
export class AddPlaylistComponent implements OnInit {

  constructor(public formBuilder: FormBuilder) { }

  group?: FormGroup;

  getTitleErrorMessage = (): string => {
    if (this.group?.controls.title.hasError('required')) {
      return 'You must enter a value';
    }
    return this.group?.controls.title.hasError('minlength')
      ? 'Insert 3 char al least'
      : '';
  }

  ngOnInit(): void {
    this.group = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
}
