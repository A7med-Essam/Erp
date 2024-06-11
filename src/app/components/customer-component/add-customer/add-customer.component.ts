import { CommonModule } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { SelectSearchDirective } from "src/app/directives/select-search.directive";
import {
  CustomerTypeEnum,
  RegisterTypeEnum,
} from "src/app/enums/customer.enum";
import { PhoneEnum } from "src/app/enums/phone.enum";
import { IArea } from "src/app/interfaces/area.interface";
import {
  ICustomerInfo,
  ICustomersCategory,
} from "src/app/interfaces/customer.interface";
import { PermissionService } from "src/app/services/permission.service";
import { CREATE_CUSTOMER_START } from "src/app/store/customerStore/customer.action";
import { customerSelector } from "src/app/store/customerStore/customer.selector";

@Component({
  selector: "app-add-customer",
  standalone: true,
  templateUrl: "./add-customer.component.html",
  styleUrls: ["./add-customer.component.scss"],
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatCardModule,
    SelectSearchDirective,
  ],
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  Permissions = this._PermissionService.Permissions;
  customerForm!: FormGroup;
  Regtype: RegisterTypeEnum[] = [
    RegisterTypeEnum.Branch,
    RegisterTypeEnum.Web,
    RegisterTypeEnum.MobileApplication,
    RegisterTypeEnum.Whatsapp,
  ];
  customerType: CustomerTypeEnum[] = [
    CustomerTypeEnum.Customer,
    CustomerTypeEnum.Sponser,
  ];
  category: ICustomersCategory[] = [];
  area: IArea[] = [];
  row!: ICustomerInfo;
  constructor(
    private _Store: Store,
    public _DialogRef: MatDialogRef<AddCustomerComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _PermissionService: PermissionService
  ) {
    this.category = data.category.data;
    this.area = data.area.data;
    this.row = data.row;
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getIndexForCustomerTypeEnum(value: any): number | undefined {
    const values = Object.values(CustomerTypeEnum);
    return values.indexOf(value);
  }

  ngOnInit(): void {
    this.createForm();
    this.handleUpdateRow();
  }

  handleUpdateRow() {
    if (this.row) {
      const userArea = this.area.filter((AreaObj) =>
        this.row.customerAdress.some(
          (customerAdressObj) => customerAdressObj.areaId === AreaObj.id
        )
      );
      this.customerForm.patchValue({
        customerId: this.row.customerId,
        id: this.row.id,
        customerName: this.row.customerName,
        birthDate: this.row.birthDate,
        status: this.row.status,
        categoryId: this.row.customerCategory,
        weight: this.row.weight,
        height: this.row.height,
        email: this.row.email,
        customerType: this.customerType.find(
          (e) => e == this.row?.customerType
        ),
        regType: this.row.regType,
      });
      if (userArea.length) {
        this.customerForm.patchValue({
          customerAdresses: userArea,
        });
        userArea.forEach((a) => {
          this.addFullAddress(
            a,
            this.row.customerAdress.find((e) => e.areaId == a.id)?.adress || ""
          );
        });
      }

      this.customerForm?.get("customerPhons")?.patchValue({
        Mobile:
          this.row.customerPhon.find((e) => e.phoneType == "Mobile")?.phone ||
          "",
        "Work Phone":
          this.row.customerPhon.find((e) => e.phoneType == "Work Phone")
            ?.phone || "",
        "Home Phone":
          this.row.customerPhon.find((e) => e.phoneType == "Home Phone")
            ?.phone || "",
        "Other Phone":
          this.row.customerPhon.find((e) => e.phoneType == "Other Phone")
            ?.phone || "",
      });
    }
  }

  closeModal() {
    this._DialogRef.close();
  }

  createForm() {
    this.customerForm = this.fb.group({
      id: [""],
      customerId: [""],
      customerName: ["", Validators.required],
      birthDate: ["", Validators.required],
      email: [""],
      customerType: ["", Validators.required],
      categoryId: ["", Validators.required],
      regType: ["", Validators.required],
      status: [true],
      weight: [0],
      height: [0],
      notes: [""],
      customerAdresses: ["", Validators.required],
      customerPhons: this.fb.group({
        Mobile: ["", Validators.required],
        "Work Phone": [],
        "Home Phone": [],
        "Other Phone": [],
      }),
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid && this.Permissions.Customers.Create) {
      if (form.value.id == "") {
        delete form.value.id;
      }
      form.value.weight = form.value.weight?.toString();
      form.value.height = form.value.height?.toString();
      form.value.customerPhons = this.handleCustomerPhone(form);
      const oldAddresses = form.value.customerAdresses;
      form.value.customerAdresses = this.createCustomerAdressesHierarchy(
        form.value.customerAdresses.map((a: IArea) => a.id)
      );
      form.value.customerType = this.getIndexForCustomerTypeEnum(
        form.value.customerType
      );

      Object.values(PhoneEnum).forEach((type) => {
        const phoneExists = form.value.customerPhons.some(
          (phone: any) => phone.phoneType === type
        );
        if (!phoneExists) {
          form.value.customerPhons.push({
            phone: "",
            phoneType: type,
          });
        }
      });
      if (
        this.row?.customerAdress?.length &&
        form.value?.customerAdresses?.length
      ) {
        form.value?.customerAdresses.map(
          (a: any) =>
            (a.id = this.row?.customerAdress?.find(
              (e) => e.areaId == a.areaId
            )?.id)
        );
      }
      this._Store.dispatch(CREATE_CUSTOMER_START({ data: form.value }));
      this._Store
        .select(customerSelector)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
          if (res.succeeded) {
            this._DialogRef.close(res.data?.find((e) => e.id == 0));
          } else {
            this.customerForm.patchValue({
              customerAdresses: oldAddresses,
            });
          }
        });
    }
  }

  handleCustomerPhone(form: FormGroup): any[] {
    const customerPhones = [];
    for (const [key, value] of Object.entries(form.value.customerPhons)) {
      if (value !== null) {
        const phoneEntry = {
          phone: value,
          phoneType: key,
        };
        customerPhones.push(phoneEntry);
      }
    }
    const filteredData = customerPhones.filter((item) => item.phone !== "");
    return filteredData;
  }

  addFullAddress(area: IArea, address: string) {
    this.customerForm.value.customerAdresses =
      this.customerForm.value.customerAdresses.map((e: any) => {
        if (e.id == area.id) {
          const cloneObj = JSON.parse(JSON.stringify(e));
          cloneObj.Adress = address;
          return cloneObj;
        }
        return e;
      });
    this.alterArea(this.customerForm.value.customerAdresses);
    this.customerForm.patchValue({
      customerAdresses: this.customerForm.value.customerAdresses,
    });
  }

  alterArea(adresses: IArea[]) {
    this.area = this.area.map((e) => {
      const foundItem = adresses.find((a) => a.id === e.id);
      return foundItem !== undefined ? foundItem : e;
    });
  }

  createCustomerAdressesHierarchy(ids: number[]) {
    return ids.map((id) => {
      const matchingArea = this.area.find((item) => item.id === id);

      if (matchingArea) {
        const { areaName, branchName, Adress } = matchingArea;

        return {
          areaId: id,
          Adress: Adress || "N/A",
          area: {
            areaName,
            branchName,
          },
        };
      } else {
        return null;
      }
    });
  }
}
