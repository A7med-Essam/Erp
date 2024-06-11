import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    RouterModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.scss"],
})
export class ResetPasswordComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _SnackBar: MatSnackBar,
    private _ActivatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this._ActivatedRoute.queryParams.subscribe((params) => {
      this.authForm.patchValue({
        email: params["email"],
        token: params["token"],
      });
    });
  }
  onSubmit(form: FormGroup) {
    if (form.valid) {
      this._AuthService.resetPassword(form.value).subscribe({
        next: () => {
          this._SnackBar.open(
            "Password reset successfully",
            "✅",
            snackBarConfig
          );
        },
      });
    }
  }
  authForm = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    token: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    confirmPassword: new FormControl(null, [Validators.required]),
  });
}
