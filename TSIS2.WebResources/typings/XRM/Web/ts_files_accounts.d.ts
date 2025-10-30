interface ts_Files_Accounts_Base extends WebEntity {
  accountid?: string | null;
  ts_fileid?: string | null;
  ts_files_accountsid?: string | null;
  versionnumber?: number | null;
}
interface ts_Files_Accounts_Relationships {
  ts_Files_Accounts?: ts_File_Result[] | null;
}
interface ts_Files_Accounts extends ts_Files_Accounts_Base, ts_Files_Accounts_Relationships {
}
interface ts_Files_Accounts_Create extends ts_Files_Accounts {
}
interface ts_Files_Accounts_Update extends ts_Files_Accounts {
}
interface ts_Files_Accounts_Select {
  accountid: WebAttribute<ts_Files_Accounts_Select, { accountid: string | null }, {  }>;
  ts_fileid: WebAttribute<ts_Files_Accounts_Select, { ts_fileid: string | null }, {  }>;
  ts_files_accountsid: WebAttribute<ts_Files_Accounts_Select, { ts_files_accountsid: string | null }, {  }>;
  versionnumber: WebAttribute<ts_Files_Accounts_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Files_Accounts_Filter {
  accountid: XQW.Guid;
  ts_fileid: XQW.Guid;
  ts_files_accountsid: XQW.Guid;
  versionnumber: number;
}
interface ts_Files_Accounts_Expand {
  ts_Files_Accounts: WebExpand<ts_Files_Accounts_Expand, ts_File_Select, ts_File_Filter, { ts_Files_Accounts: ts_File_Result[] }>;
}
interface ts_Files_Accounts_FormattedResult {
}
interface ts_Files_Accounts_Result extends ts_Files_Accounts_Base, ts_Files_Accounts_Relationships {
  "@odata.etag": string;
}
interface ts_Files_Accounts_RelatedOne {
}
interface ts_Files_Accounts_RelatedMany {
  ts_Files_Accounts: WebMappingRetrieve<ts_File_Select,ts_File_Expand,ts_File_Filter,ts_File_Fixed,ts_File_Result,ts_File_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_files_accountsset: WebMappingRetrieve<ts_Files_Accounts_Select,ts_Files_Accounts_Expand,ts_Files_Accounts_Filter,ts_Files_Accounts_Fixed,ts_Files_Accounts_Result,ts_Files_Accounts_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_files_accountsset: WebMappingRelated<ts_Files_Accounts_RelatedOne,ts_Files_Accounts_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_files_accountsset: WebMappingCUDA<ts_Files_Accounts_Create,ts_Files_Accounts_Update,ts_Files_Accounts_Select>;
}
