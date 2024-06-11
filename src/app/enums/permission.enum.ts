enum Customers {
  View = "Permissions.Customers.View",
  Create = "Permissions.Customers.Create",
  Edit = "Permissions.Customers.Edit",
  Delete = "Permissions.Customers.Delete",
  Search = "Permissions.Customers.Search",
  Export = "Permissions.Customers.Export",
}

enum Roles {
  View = "Permissions.Roles.View",
  Create = "Permissions.Roles.Create",
  Edit = "Permissions.Roles.Edit",
  Delete = "Permissions.Roles.Delete",
  Search = "Permissions.Roles.Search",
}

enum RoleClaims {
  View = "Permissions.RoleClaims.View",
  Create = "Permissions.RoleClaims.Create",
  Edit = "Permissions.RoleClaims.Edit",
  Delete = "Permissions.RoleClaims.Delete",
  Search = "Permissions.RoleClaims.Search",
}
enum Subscriptions {
  View = "Permissions.Subscriptions.View",
  Create = "Permissions.Subscriptions.Create",
  Edit = "Permissions.Subscriptions.Edit",
  Search = "Permissions.Subscriptions.Search",
  Export = "Permissions.Subscriptions.Export",
}
enum Invoices {
  View = "Permissions.Invoices.View",
  ViewDetails = "Permissions.Invoices.ViewDetails",
  Edit = "Permissions.Invoices.Edit",
  Search = "Permissions.Invoices.Search",
  Export = "Permissions.Invoices.Export",
}
enum CustomersRetention {
  View = "Permissions.CustomersRetention.View",
  Search = "Permissions.CustomersRetention.Search",
  Export = "Permissions.CustomersRetention.Export",
}
enum AllLog {
  View = "Permissions.AllLog.View",
  Search = "Permissions.AllLog.Search",
  Export = "Permissions.AllLog.Export",
}
enum Operations {
  View = "Permissions.Operations.View",
  Search = "Permissions.Operations.Search",
  ChangeDeliveryState = "Permissions.Operations.ChangeDeliveryState",
  Export = "Permissions.Operations.Export",
}
enum Users {
  View = "Permissions.Users.View",
  Create = "Permissions.Users.Create",
  Edit = "Permissions.Users.Edit",
  Delete = "Permissions.Users.Delete",
  Search = "Permissions.Users.Search",
}
enum SubscriptionActions {
  ChangeStatus = "Permissions.SubscriptionActions.ChangeStatus",
  Extend = "Permissions.SubscriptionActions.Extend",
  EditCustomerData = "Permissions.SubscriptionActions.EditCustomerData",
  Deduct = "Permissions.SubscriptionActions.Deduct",
  Renew = "Permissions.SubscriptionActions.Renew",
  Migrate = "Permissions.SubscriptionActions.Migrate",
  DeleteDays = "Permissions.SubscriptionActions.DeleteDays",
  ChangeDayState = "Permissions.SubscriptionActions.ChangeDayState",
  UpdateNutiration = "Permissions.SubscriptionActions.UpdateNutiration",
  ViewLog = "Permissions.SubscriptionActions.ViewLog",
  ViewDeliveryLog = "Permissions.SubscriptionActions.ViewDeliveryLog",
  ViewInvoiceLog = "Permissions.SubscriptionActions.ViewInvoiceLog",
  ViewDislikeLog = "Permissions.SubscriptionActions.ViewDislikeLog",
  ViewDeliveryNoteLog = "Permissions.SubscriptionActions.ViewDeliveryNoteLog",
  ChangeDeliveryDetails = "Permissions.SubscriptionActions.ChangeDeliveryDetails",
  ChangeDeliveryNotes = "Permissions.SubscriptionActions.ChangeDeliveryNotes",
  hold = "Permissions.SubscriptionActions.hold",
  UpdateNotes = "Permissions.SubscriptionActions.UpdateNotes",
  Active = "Permissions.SubscriptionActions.Active",
  ChangeMealTypes = "Permissions.SubscriptionActions.ChangeMealTypes",
  ChangeDeliveryDays = "Permissions.SubscriptionActions.ChangeDeliveryDays",
  CreateCustomMeal = "Permissions.SubscriptionActions.CreateCustomMeal",
  ChangeMeal = "Permissions.SubscriptionActions.ChangeMeal",
  ChangeStartDate = "Permissions.SubscriptionActions.ChangeStartDate",
  Restrict = "Permissions.SubscriptionActions.Restrict",
  Unrestrict = "Permissions.SubscriptionActions.Unrestrict",
  Dislike = "Permissions.SubscriptionActions.Dislike",
  DeleteDislike = "Permissions.SubscriptionActions.DeleteDislike",
  Merge = "Permissions.SubscriptionActions.Merge",
}

enum SubscriptionManager {
  View = "Permissions.SubscriptionManager.View",
  Search = "Permissions.SubscriptionManager.Search",
}

enum AutoDislike {
  View = "Permissions.AutoDislike.View",
  Create = "Permissions.AutoDislike.Create",
  Edit = "Permissions.AutoDislike.Edit",
  Delete = "Permissions.AutoDislike.Delete",
  Search = "Permissions.AutoDislike.Search",
}

enum Governorate {
  View = "Permissions.Governorate.View",
  Create = "Permissions.Governorate.Create",
  Edit = "Permissions.Governorate.Edit",
  Delete = "Permissions.Governorate.Delete",
  Search = "Permissions.Governorate.Search",
}
enum City {
  View = "Permissions.City.View",
  Create = "Permissions.City.Create",
  Edit = "Permissions.City.Edit",
  Delete = "Permissions.City.Delete",
  Search = "Permissions.City.Search",
}
enum Area {
  View = "Permissions.Area.View",
  Create = "Permissions.Area.Create",
  Edit = "Permissions.Area.Edit",
  Delete = "Permissions.Area.Delete",
  Search = "Permissions.Area.Search",
}
enum Driver {
  View = "Permissions.Driver.View",
  Create = "Permissions.Driver.Create",
  Edit = "Permissions.Driver.Edit",
  Delete = "Permissions.Driver.Delete",
  Search = "Permissions.Driver.Search",
}

enum Plan {
  View = "Permissions.Plan.View",
  Create = "Permissions.Plan.Create",
  Edit = "Permissions.Plan.Edit",
  Delete = "Permissions.Plan.Delete",
  Search = "Permissions.Plan.Search",
}

export const PERMISSIONS = {
  Customers,
  Roles,
  RoleClaims,
  Subscriptions,
  Invoices,
  CustomersRetention,
  AllLog,
  Operations,
  Users,
  SubscriptionActions,
  SubscriptionManager,
  AutoDislike,
  Governorate,
  City,
  Area,
  Driver,
  Plan
};
