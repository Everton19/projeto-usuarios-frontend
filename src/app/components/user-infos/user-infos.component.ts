import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserService } from '../../services/update-user.service';

@Component({
  selector: 'app-user-infos',
  imports: [ReactiveFormsModule],
  templateUrl: './user-infos.component.html',
  styleUrl: './user-infos.component.scss'
})
export class UserInfosComponent {
  private _updateUserService = inject(UpdateUserService);

  userInfosForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  updateUser(){
    this._updateUserService.update(this.userInfosForm.value as any).subscribe({
      next: () => {
        this.userInfosForm.setErrors({ 'update-success': true });
      },
      error: () => {
        this.userInfosForm.setErrors({ 'update-error': true });
      }
    })
  }
}
