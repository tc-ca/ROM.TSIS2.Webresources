interface qm_account_tylegislationcharacteristic_Base extends WebEntity {
  accountid?: string | null;
  qm_account_tylegislationcharacteristicid?: string | null;
  qm_tylegislationcharacteristicid?: string | null;
  versionnumber?: number | null;
}
interface qm_account_tylegislationcharacteristic_Relationships {
  qm_account_tylegislationcharacteristic?: qm_tylegislationcharacteristic_Result[] | null;
}
interface qm_account_tylegislationcharacteristic extends qm_account_tylegislationcharacteristic_Base, qm_account_tylegislationcharacteristic_Relationships {
}
interface qm_account_tylegislationcharacteristic_Create extends qm_account_tylegislationcharacteristic {
}
interface qm_account_tylegislationcharacteristic_Update extends qm_account_tylegislationcharacteristic {
}
interface qm_account_tylegislationcharacteristic_Select {
  accountid: WebAttribute<qm_account_tylegislationcharacteristic_Select, { accountid: string | null }, {  }>;
  qm_account_tylegislationcharacteristicid: WebAttribute<qm_account_tylegislationcharacteristic_Select, { qm_account_tylegislationcharacteristicid: string | null }, {  }>;
  qm_tylegislationcharacteristicid: WebAttribute<qm_account_tylegislationcharacteristic_Select, { qm_tylegislationcharacteristicid: string | null }, {  }>;
  versionnumber: WebAttribute<qm_account_tylegislationcharacteristic_Select, { versionnumber: number | null }, {  }>;
}
interface qm_account_tylegislationcharacteristic_Filter {
  accountid: XQW.Guid;
  qm_account_tylegislationcharacteristicid: XQW.Guid;
  qm_tylegislationcharacteristicid: XQW.Guid;
  versionnumber: number;
}
interface qm_account_tylegislationcharacteristic_Expand {
  qm_account_tylegislationcharacteristic: WebExpand<qm_account_tylegislationcharacteristic_Expand, qm_tylegislationcharacteristic_Select, qm_tylegislationcharacteristic_Filter, { qm_account_tylegislationcharacteristic: qm_tylegislationcharacteristic_Result[] }>;
}
interface qm_account_tylegislationcharacteristic_FormattedResult {
}
interface qm_account_tylegislationcharacteristic_Result extends qm_account_tylegislationcharacteristic_Base, qm_account_tylegislationcharacteristic_Relationships {
  "@odata.etag": string;
}
interface qm_account_tylegislationcharacteristic_RelatedOne {
}
interface qm_account_tylegislationcharacteristic_RelatedMany {
  qm_account_tylegislationcharacteristic: WebMappingRetrieve<qm_tylegislationcharacteristic_Select,qm_tylegislationcharacteristic_Expand,qm_tylegislationcharacteristic_Filter,qm_tylegislationcharacteristic_Fixed,qm_tylegislationcharacteristic_Result,qm_tylegislationcharacteristic_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_account_tylegislationcharacteristicset: WebMappingRetrieve<qm_account_tylegislationcharacteristic_Select,qm_account_tylegislationcharacteristic_Expand,qm_account_tylegislationcharacteristic_Filter,qm_account_tylegislationcharacteristic_Fixed,qm_account_tylegislationcharacteristic_Result,qm_account_tylegislationcharacteristic_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_account_tylegislationcharacteristicset: WebMappingRelated<qm_account_tylegislationcharacteristic_RelatedOne,qm_account_tylegislationcharacteristic_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_account_tylegislationcharacteristicset: WebMappingCUDA<qm_account_tylegislationcharacteristic_Create,qm_account_tylegislationcharacteristic_Update,qm_account_tylegislationcharacteristic_Select>;
}
