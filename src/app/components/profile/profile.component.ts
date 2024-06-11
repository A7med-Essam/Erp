import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTabsModule } from "@angular/material/tabs";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { IdentityService } from "src/app/services/identity.service";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { GuardService } from "src/app/services/guard.service";
import { LocalService } from "src/app/services/local.service";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { snackBarConfig } from "src/app/models/MatSnackBarConfig";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  currentTabIndex = 0;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _IdentityService: IdentityService,
    private _formBuilder: FormBuilder,
    private _GuardService: GuardService,
    private _LocalService: LocalService,
    private _AuthService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  profileForm: FormGroup = this._formBuilder.group({
    firstName: [
      this._GuardService.getDecodedAccessToken()?.name,
      Validators.required,
    ],
    lastName: [
      this._GuardService.getDecodedAccessToken()?.surname,
      Validators.required,
    ],
    email: [
      this._GuardService.getDecodedAccessToken()?.emailAddress,
      Validators.required,
    ],
    phoneNumber: [
      this._GuardService.getDecodedAccessToken()?.mobilePhone,
      Validators.required,
    ],
  });

  securityForm: FormGroup = this._formBuilder.group({
    password: ["", Validators.required],
    newPassword: ["", Validators.required],
    confirmNewPassword: ["", Validators.required],
  });

  updateProfile(form: FormGroup) {
    if (form.valid) {
      this._IdentityService.updateProfile(form.value).subscribe({
        next: (res) => {
          this._AuthService
            .refreshToken({
              refreshToken: this._GuardService.getUser().data.refreshToken,
              token: this._GuardService.getUser().data.token,
            })
            .subscribe((res) => {
              this._LocalService.setJsonValue("ERP_CREDENTIALS", res);
              this._snackBar.open(
                "Profile updated successfully",
                "✅",
                snackBarConfig
              );
            });
        },
      });
    }
  }

  ChangePassword(form: FormGroup) {
    if (form.valid) {
      this._IdentityService.ChangePassword(form.value).subscribe({
        next: (res) => {
          this.securityForm.reset();
          this._snackBar.open(
            "Password updated successfully",
            "✅",
            snackBarConfig
          );
        },
      });
    }
  }

  ngOnInit(): void {
    this._ActivatedRoute.fragment.subscribe((fragment) => {
      if (fragment) {
        this.currentTabIndex = parseInt(fragment) - 1;
      }
    });
  }
}
