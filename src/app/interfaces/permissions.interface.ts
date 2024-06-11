export interface IPermissions {
    Customers: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
      Export: boolean;
    };
    Roles: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    RoleClaims: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    Subscriptions: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Search: boolean;
      Export: boolean;
    };
    Invoices: {
      View: boolean;
      ViewDetails: boolean;
      Edit: boolean;
      Search: boolean;
      Export: boolean;
    };
    CustomersRetention: {
      View: boolean;
      Search: boolean;
      Export: boolean;
    };
    AllLog: {
      View: boolean;
      Search: boolean;
      Export: boolean;
    };
    Operations: {
      View: boolean;
      Search: boolean;
      Export: boolean;
      ChangeDeliveryState: boolean;
    };
    Users: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    SubscriptionActions: {
      ChangeStatus: boolean;
      Extend: boolean;
      EditCustomerData: boolean;
      Deduct: boolean;
      Renew: boolean;
      Migrate: boolean;
      DeleteDays: boolean;
      ChangeDayState: boolean;
      UpdateNutiration: boolean;
      ViewLog: boolean;
      ViewDeliveryLog: boolean;
      ViewInvoiceLog: boolean;
      ViewDislikeLog: boolean;
      ViewDeliveryNoteLog: boolean;
      ChangeDeliveryDetails: boolean;
      ChangeDeliveryNotes: boolean;
      hold: boolean;
      UpdateNotes: boolean;
      Active: boolean;
      ChangeMealTypes: boolean;
      ChangeDeliveryDays: boolean;
      CreateCustomMeal: boolean;
      ChangeMeal: boolean;
      ChangeStartDate: boolean;
      Restrict: boolean;
      Unrestrict: boolean;
      Dislike: boolean;
      DeleteDislike: boolean;
      Merge: boolean;
    };
    SubscriptionManager: {
      View: boolean;
      Search: boolean;
    };
    AutoDislike: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    Governorate: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    City: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    Area: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    Driver: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
    Plan: {
      View: boolean;
      Create: boolean;
      Edit: boolean;
      Delete: boolean;
      Search: boolean;
    };
  }