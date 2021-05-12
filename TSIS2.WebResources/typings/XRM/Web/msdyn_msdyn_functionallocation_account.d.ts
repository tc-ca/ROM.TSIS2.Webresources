interface msdyn_msdyn_functionallocation_account_Base extends WebEntity {
  accountid?: string | null;
  msdyn_functionallocationid?: string | null;
  msdyn_msdyn_functionallocation_accountid?: string | null;
  versionnumber?: number | null;
}
interface msdyn_msdyn_functionallocation_account_Relationships {
  msdyn_msdyn_functionallocation_account?: Account_Result[] | null;
}
interface msdyn_msdyn_functionallocation_account extends msdyn_msdyn_functionallocation_account_Base, msdyn_msdyn_functionallocation_account_Relationships {
}
interface msdyn_msdyn_functionallocation_account_Create extends msdyn_msdyn_functionallocation_account {
}
interface msdyn_msdyn_functionallocation_account_Update extends msdyn_msdyn_functionallocation_account {
}
interface msdyn_msdyn_functionallocation_account_Select {
  accountid: WebAttribute<msdyn_msdyn_functionallocation_account_Select, { accountid: string | null }, {  }>;
  msdyn_functionallocationid: WebAttribute<msdyn_msdyn_functionallocation_account_Select, { msdyn_functionallocationid: string | null }, {  }>;
  msdyn_msdyn_functionallocation_accountid: WebAttribute<msdyn_msdyn_functionallocation_account_Select, { msdyn_msdyn_functionallocation_accountid: string | null }, {  }>;
  versionnumber: WebAttribute<msdyn_msdyn_functionallocation_account_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_msdyn_functionallocation_account_Filter {
  accountid: XQW.Guid;
  msdyn_functionallocationid: XQW.Guid;
  msdyn_msdyn_functionallocation_accountid: XQW.Guid;
  versionnumber: number;
}
interface msdyn_msdyn_functionallocation_account_Expand {
  msdyn_msdyn_functionallocation_account: WebExpand<msdyn_msdyn_functionallocation_account_Expand, Account_Select, Account_Filter, { msdyn_msdyn_functionallocation_account: Account_Result[] }>;
}
interface msdyn_msdyn_functionallocation_account_FormattedResult {
}
interface msdyn_msdyn_functionallocation_account_Result extends msdyn_msdyn_functionallocation_account_Base, msdyn_msdyn_functionallocation_account_Relationships {
  "@odata.etag": string;
}
interface msdyn_msdyn_functionallocation_account_RelatedOne {
}
interface msdyn_msdyn_functionallocation_account_RelatedMany {
  msdyn_msdyn_functionallocation_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_msdyn_functionallocation_accountset: WebMappingRetrieve<msdyn_msdyn_functionallocation_account_Select,msdyn_msdyn_functionallocation_account_Expand,msdyn_msdyn_functionallocation_account_Filter,msdyn_msdyn_functionallocation_account_Fixed,msdyn_msdyn_functionallocation_account_Result,msdyn_msdyn_functionallocation_account_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_msdyn_functionallocation_accountset: WebMappingRelated<msdyn_msdyn_functionallocation_account_RelatedOne,msdyn_msdyn_functionallocation_account_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_msdyn_functionallocation_accountset: WebMappingCUDA<msdyn_msdyn_functionallocation_account_Create,msdyn_msdyn_functionallocation_account_Update,msdyn_msdyn_functionallocation_account_Select>;
}
