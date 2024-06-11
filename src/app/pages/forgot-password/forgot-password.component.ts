import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-forgot-password",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: "./forgot-password.component.html",
})
export class ForgotPasswordComponent {
  constructor(
    private _AuthService: AuthService,
    private _SnackBar: MatSnackBar
  ) {}
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._AuthService.forgotPassword(form.value).subscribe({
        next: () => {
          this._SnackBar.open("Please check your email", "✅", {
            duration: 10000,
          });
        },
      });
    }
  }
  authForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
}
