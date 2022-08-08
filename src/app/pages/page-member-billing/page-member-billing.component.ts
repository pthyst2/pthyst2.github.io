import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
//#region Services
import { FormService } from 'src/app/services/utilities/form.service';
import { AuthService } from 'src/app/services/data/auth.service';
import { UserPlanService } from 'src/app/services/data/user-plan.service';
import { UserCardService } from 'src/app/services/data/user-card.service';
import { CreditCardService } from 'src/app/services/utilities/credit-card.service';
import { AddressService } from 'src/app/services/data/address.service';
import { InvoiceService } from 'src/app/services/data/invoice.service';
import { CountryService } from 'src/app/services/data/country.service';
//#endregion
@Component({
  selector: 'page-member-billing',
  templateUrl: './page-member-billing.component.html',
  styleUrls: ['./page-member-billing.component.sass'],
})
export class PageMemberBillingComponent implements OnInit {
  //#region Variables
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  user: any;
  editMode = false;
  editTitle = 'Edit Mode';
  subscriptionInfo: any = {
    data: undefined,
    selects: {
      plans: [],
    },
    loading: false,
    edit: false,
    form: this.fb.group({
      user: ['', [Validators.required]],
      plan: ['', [Validators.required]],
    }),
  };
  addressInfo: any = {
    data: {
      billing: undefined,
      service: undefined,
    },
    loading: {
      billing: false,
      service: false,
    },
    edit: false,
    selects: {
      countries: [],
    },
    forms: {
      billing: this.fb.group({
        user: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: [''],
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        unit: [''],
        postalCode: ['', [Validators.required]],
      }),
      service: this.fb.group({
        user: ['', [Validators.required]],
        country: ['', [Validators.required]],
        state: [''],
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        unit: [''],
        postalCode: ['', [Validators.required]],
      }),
    },
    submits: {
      billing: false,
      service: false,
    },
    messages: {
      country: {
        required: 'Please select country.',
      },
      city: {
        required: 'City information cannot be empty.',
      },
      street: {
        required: 'Street information cannot be empty.',
      },
      postalCode: {
        required: 'Postal code information cannot be empty.',
      },
    },
  };
  paymentInfo: any = {
    data: undefined,
    loading: false,
    edit: false,
    selects: {
      years: [],
      types: [],
    },
    form: this.fb.group({
      user: ['', [Validators.required]],
      type: ['', [Validators.required]],
      holder: ['', [Validators.required]],
      number: ['', [Validators.required]],
      expMonth: ['', [Validators.required]],
      expYear: ['', Validators.required],
      cvc: ['', [Validators.required]],
    }),
    shows: {
      number: false,
      cvc: false,
    },
    messages: {
      type: {
        required: 'Please select type of credit card.',
      },
      holder: {
        required: "Card's holder cannot be empty.",
      },
      number: {
        required: "Card's number cannot be empty.",
      },
      expMonth: {
        required: 'Please select expire month of credit card.',
      },
      expYear: {
        required: 'Please select expire year of credit card.',
      },
      cvc: {
        required: 'Please provide cvc number of credit card.',
      },
    },
  };
  invoiceInfo: any = {
    loading: false,
    data: [],
  };
  popup: any = {};
  //#endregion

  constructor(
    private fb: FormBuilder,
    public fs: FormService,
    private authService: AuthService,
    private addressService: AddressService,
    private planService: UserPlanService,
    private ccService: CreditCardService,
    private paymentService: UserCardService,
    private invoicService: InvoiceService,
    private countryService: CountryService
  ) {}

  ngOnInit(): void {
    this.getData('user');
    if (this.user) {
      this.getData('sub');
      this.getData('bill');
      this.getData('service');
      this.getData('payment');
      this.transferDataToForms();
    }
    this.getData('plans');
    this.getData('countries');
    this.getData('invoices');
    this.getData('card-types');
    this.getData('card-years');
  }

  getData(name: string) {
    switch (name) {
      case 'user': {
        this.user = this.authService.getUserDecoded();
        break;
      }
      case 'sub': {
        this.subscriptionInfo.loading = true;
        this.subscriptionInfo.data = this.planService.getSubscription(
          this.user._id
        )[0].items[0];
        setTimeout(() => {
          this.subscriptionInfo.loading = false;
        }, 1000);
        break;
      }
      case 'bill': {
        this.addressInfo.loading.billing = true;
        this.addressInfo.data.billing = this.addressService.getBillAddress(
          this.user._id
        )[0].items[0];
        setTimeout(() => {
          this.addressInfo.loading.billing = false;
        }, 1000);
        break;
      }
      case 'service': {
        this.addressInfo.loading.service = true;
        this.addressInfo.data.service = this.addressService.getServiceAddress(
          this.user._id
        )[0].items[0];
        setTimeout(() => {
          this.addressInfo.loading.service = false;
        }, 1000);
        break;
      }
      case 'payment': {
        this.paymentInfo.loading = true;
        this.paymentInfo.data = this.paymentService.getCard(this.user._id).data;
        setTimeout(() => {
          this.paymentInfo.loading = false;
        }, 1000);
        break;
      }
      case 'plans': {
        this.subscriptionInfo.selects.plans = this.planService.getPlans().data;
        break;
      }
      case 'invoices': {
        this.invoiceInfo.loading = true;
        this.invoiceInfo.data = this.invoicService.getAll(
          this.user._id
        )[0].items;
        setTimeout(() => {
          this.invoiceInfo.loading = false;
        }, 1000);
        break;
      }
      case 'countries': {
        this.countryService.getAllCountries().subscribe({
          next: (res) => {
            let data: any = res;
            this.addressInfo.selects.countries =
              this.countryService.sortAZ(data);
          },
          error: (err) => {
            console.error('Error when getting countries data: ', err);
          },
        });
        break;
      }
      case 'card-types': {
        this.paymentInfo.selects.types =
          this.paymentService.getTypes()[0].items;
        break;
      }
      case 'card-years': {
        this.paymentInfo.selects.years = this.ccService.getExpireYears();
        break;
      }
    }
  }
  dataToForm(formName: string, data: any) {
    let ctr: any = this.ctr(formName);
    switch (formName) {
      case 'sub': {
        ctr.user.setValue(data.user);
        ctr.plan.setValue(data.plan);
        break;
      }
      case 'bill':
      case 'service': {
        ctr.user.setValue(data.user);
        ctr.country.setValue(data.country);
        ctr.city.setValue(data.city);
        ctr.unit.setValue(data.unit ? data.unit : '');
        ctr.state.setValue(data.state ? data.state : '');
        ctr.street.setValue(data.street ? data.street : '');
        ctr.postalCode.setValue(data.postalCode);
        break;
      }
      case 'payment': {
        ctr.user.setValue(data.user);
        ctr.type.setValue(data.type);
        ctr.holder.setValue(data.holder);
        ctr.number.setValue(data.cardNumber);
        ctr.expMonth.setValue(data.expire.month);
        ctr.expYear.setValue(data.expire.year);
        ctr.cvc.setValue(data.cvc);
        break;
      }
    }
  }
  transferDataToForms() {
    if (this.subscriptionInfo.data) {
      this.dataToForm('sub', this.subscriptionInfo.data);
    }
    if (this.addressInfo.data.billing) {
      this.dataToForm('bill', this.addressInfo.data.billing);
    }
    if (this.addressInfo.data.service) {
      this.dataToForm('service', this.addressInfo.data.service);
    }
    if (this.paymentInfo.data) {
      this.dataToForm('payment', this.paymentInfo.data);
    }
  }
  form(name: string) {
    let result: any;
    switch (name) {
      case 'sub': {
        result = this.subscriptionInfo.form;
        break;
      }
      case 'bill': {
        result = this.addressInfo.forms.billing;
        break;
      }
      case 'service': {
        result = this.addressInfo.forms.service;
        break;
      }
      case 'payment': {
        result = this.paymentInfo.form;
        break;
      }
    }
    return result;
  }
  ctr(name: string) {
    return this.form(name).controls;
  }
  toggleEdit(name: string) {
    this.editMode = !this.editMode;
    switch (name) {
      case 'sub': {
        this.editTitle = this.subscriptionInfo.data
          ? 'Change Plan'
          : 'Choose Plan';
        this.subscriptionInfo.edit = !this.subscriptionInfo.edit;
        break;
      }
      case 'address': {
        this.editTitle =
          !this.addressInfo.data.billing && !this.addressInfo.data.service
            ? 'Setup Addresses'
            : 'Edit Addresses';
        this.addressInfo.edit = !this.addressInfo.edit;
        break;
      }
      case 'payment': {
        this.editTitle = this.paymentInfo.data
          ? 'Edit Payment'
          : 'Setup Payment Method';
        this.paymentInfo.edit = !this.paymentInfo.edit;
        break;
      }
    }
  }
  submitForm(name: string, content?: any) {
    switch (name) {
      case 'sub': {
        this.ctr('sub').plan.setValue(content._id);
        this.ctr('sub').user.setValue(this.user._id);
        this.subscriptionInfo.submitted = true;
        if (this.form('sub').valid) {
          this.subscriptionInfo.edit = false;
          this.editMode = false;
          this.popup = {
            show: true,
            icon: 'success',
            title: 'Subsciption updated!',
            timer: 1500,
          };
          this.getData('sub');
        } else {
          this.popup = {
            show: true,
            icon: 'error',
            title: 'Invalid or missing info',
            html: 'Please checkk all information and try again.',
          };
        }
        break;
      }
      case 'bill': {
        this.addressInfo.submits.billing = true;
        this.ctr('bill').user.setValue(this.user._id);
        if (this.form('bill').valid) {
          this.popup = {
            show: true,
            icon: 'success',
            title: 'Billing address updated!',
            timer: 1500,
          };
          this.getData('bill');
        } else {
          this.popup = {
            show: true,
            icon: 'error',
            title: 'Invalid or missing info',
            html: 'Please checkk all information and try again.',
          };
        }
        break;
      }
      case 'service': {
        this.addressInfo.submits.service = true;
        this.ctr('service').user.setValue(this.user._id);
        if (this.form('service').valid) {
          this.popup = {
            show: true,
            icon: 'success',
            title: 'Service address updated!',
            timer: 1500,
          };
          this.getData('service');
        } else {
          this.popup = {
            show: true,
            icon: 'error',
            title: 'Invalid or missing info',
            html: 'Please checkk all information and try again.',
          };
        }
        break;
      }
      case 'payment': {
        this.paymentInfo.submitted = true;
        this.ctr('payment').user.setValue(this.user._id);
        if (this.form('payment').valid) {
          this.paymentInfo.edit = false;
          this.editMode = false;
          this.popup = {
            show: true,
            icon: 'success',
            title: 'Payment updated!',
            timer: 1500,
          };
          this.getData('payment');
        } else {
          this.popup = {
            show: true,
            icon: 'error',
            title: 'Invalid or missing info',
            html: 'Please checkk all information and try again.',
          };
        }
        break;
      }
    }
  }
}
