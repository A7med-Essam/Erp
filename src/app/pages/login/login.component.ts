import { CommonModule, NgIf } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router, RouterModule } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ApiConfigService } from "src/app/core/api-config.service";
import { AuthService } from "src/app/services/auth.service";
import { GuardService } from "src/app/services/guard.service";
import { LOGIN_START } from "src/app/store/authStore/auth.action";
import { IState } from "src/app/store/authStore/auth.reducer";
import { loginSelector } from "src/app/store/authStore/auth.selector";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: "./login.component.html",
  providers: [AuthService, ApiConfigService, HttpClient],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  login$!: Observable<IState>;

  constructor(
    private _GuardService: GuardService,
    private _Router: Router,
    private _Store: Store
  ) {
    this.login$ = _Store.select(loginSelector);
  }

  ngOnInit() {
    this.createLoginForm();
    if (this._GuardService.getUser()) {
      this._Router.navigate(["./home"]);
    }
  }

  login(data: FormGroup) {
    if (data.valid) {
      this._Store.dispatch(LOGIN_START({ data: data.value }));
    }
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
}
