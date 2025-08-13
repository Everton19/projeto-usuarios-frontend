import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserService } from '../../services/update-user.service';
import { CreateUserService } from '../../services/create-user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IUserRequest } from '../../interfaces/user-request.interface';

@Component({
  selector: 'app-user-infos',
  imports: [ReactiveFormsModule],
  templateUrl: './user-infos.component.html',
  styleUrl: './user-infos.component.scss',
})
export class UserInfosComponent {
  private _updateUserService = inject(UpdateUserService);
  private _createUserService = inject(CreateUserService);

  userInfosForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  createUser() {
    this._createUserService.create(this.userInfosForm.value as IUserRequest).subscribe({
      next: () => {
        this.userInfosForm.setErrors({ 'create-success': true });
      },
      error: (error: HttpErrorResponse) => {
        const STATUS_ERROR = error.status;

        if (STATUS_ERROR === 409) {
          return this.userInfosForm.setErrors({ 'existing-error': true });
        }

        this.userInfosForm.setErrors({ 'create-error': true });
      }
    });
  }

  updateUser() {
    this._updateUserService.update(this.userInfosForm.value as IUserRequest).subscribe({
      next: () => {
        this.userInfosForm.setErrors({ 'update-success': true });
      },
      error: () => {
        this.userInfosForm.setErrors({ 'update-error': true });
      },
    });
  }
}
