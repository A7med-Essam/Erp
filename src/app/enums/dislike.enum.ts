export enum PolicyEnum {
  "Regular Policy",
  "Spisific Qty Policy",
  "Equational Policy",
  "Manual Policy",
}

// [Description("Regular Policy")][Tips("When Items Unit Are Equal , Will Keep Item Qty")] Regular,
// [Description("Spisific Qty Policy")][Tips("Will Search For Item With Same Qty And Replace It")] SpisificQty,
// [Description("Equational Policy")][Tips("Rplacement With Equation For Each QTY")] Equational,
// [Description("Manual Policy")][Tips("Will Replace an Item And Ask EndUser To Enter The QTY")] Manual

export enum DislikePolicyEnum {
  "Regular Policy" = "Regular Policy",
  "Spisific Qty Policy" = "Spisific Qty Policy",
  "Equational Policy" = "Equational Policy",
  "Manual Policy" = "Manual Policy",
}
