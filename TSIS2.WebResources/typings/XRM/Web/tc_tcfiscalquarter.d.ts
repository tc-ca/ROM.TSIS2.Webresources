interface tc_TCFiscalQuarter_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: tc_tcfiscalquarter_statecode | null;
  statuscode?: tc_tcfiscalquarter_statuscode | null;
  tc_fiscalquarterlbl?: string | null;
  tc_fiscalquarterlonglbl?: string | null;
  tc_fiscalquarternum?: number | null;
  tc_name?: string | null;
  tc_quarterend?: Date | null;
  tc_quarterstart?: Date | null;
  tc_tcfiscalquarterid?: string | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface tc_TCFiscalQuarter_Relationships {
  ovs_BookableResourceBooking_PlannedFiscalQuar?: BookableResourceBooking_Result[] | null;
  ovs_BookableResourceBooking_RevisedQuarter_tc?: BookableResourceBooking_Result[] | null;
  ovs_msdyn_workorder_CurrentFiscalQuarter_tc_T?: msdyn_workorder_Result[] | null;
  ovs_msdyn_workorder_FiscalQuarter_tc_TCFiscal?: msdyn_workorder_Result[] | null;
  ovs_tc_tcfiscalquarter_msdyn_workorder?: msdyn_workorder_Result[] | null;
  tc_TCFiscalYearId?: tc_TCFiscalYear_Result | null;
}
interface tc_TCFiscalQuarter extends tc_TCFiscalQuarter_Base, tc_TCFiscalQuarter_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  tc_TCFiscalYearId_bind$tc_tcfiscalyears?: string | null;
}
interface tc_TCFiscalQuarter_Create extends tc_TCFiscalQuarter {
}
interface tc_TCFiscalQuarter_Update extends tc_TCFiscalQuarter {
}
interface tc_TCFiscalQuarter_Select {
  createdby_guid: WebAttribute<tc_TCFiscalQuarter_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<tc_TCFiscalQuarter_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<tc_TCFiscalQuarter_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<tc_TCFiscalQuarter_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<tc_TCFiscalQuarter_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<tc_TCFiscalQuarter_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<tc_TCFiscalQuarter_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<tc_TCFiscalQuarter_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<tc_TCFiscalQuarter_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<tc_TCFiscalQuarter_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<tc_TCFiscalQuarter_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<tc_TCFiscalQuarter_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<tc_TCFiscalQuarter_Select, { statecode: tc_tcfiscalquarter_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<tc_TCFiscalQuarter_Select, { statuscode: tc_tcfiscalquarter_statuscode | null }, { statuscode_formatted?: string }>;
  tc_fiscalquarterlbl: WebAttribute<tc_TCFiscalQuarter_Select, { tc_fiscalquarterlbl: string | null }, {  }>;
  tc_fiscalquarterlonglbl: WebAttribute<tc_TCFiscalQuarter_Select, { tc_fiscalquarterlonglbl: string | null }, {  }>;
  tc_fiscalquarternum: WebAttribute<tc_TCFiscalQuarter_Select, { tc_fiscalquarternum: number | null }, {  }>;
  tc_name: WebAttribute<tc_TCFiscalQuarter_Select, { tc_name: string | null }, {  }>;
  tc_quarterend: WebAttribute<tc_TCFiscalQuarter_Select, { tc_quarterend: Date | null }, { tc_quarterend_formatted?: string }>;
  tc_quarterstart: WebAttribute<tc_TCFiscalQuarter_Select, { tc_quarterstart: Date | null }, { tc_quarterstart_formatted?: string }>;
  tc_tcfiscalquarterid: WebAttribute<tc_TCFiscalQuarter_Select, { tc_tcfiscalquarterid: string | null }, {  }>;
  tc_tcfiscalyearid_guid: WebAttribute<tc_TCFiscalQuarter_Select, { tc_tcfiscalyearid_guid: string | null }, { tc_tcfiscalyearid_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<tc_TCFiscalQuarter_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<tc_TCFiscalQuarter_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<tc_TCFiscalQuarter_Select, { versionnumber: number | null }, {  }>;
}
interface tc_TCFiscalQuarter_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: tc_tcfiscalquarter_statecode;
  statuscode: tc_tcfiscalquarter_statuscode;
  tc_fiscalquarterlbl: string;
  tc_fiscalquarterlonglbl: string;
  tc_fiscalquarternum: number;
  tc_name: string;
  tc_quarterend: Date;
  tc_quarterstart: Date;
  tc_tcfiscalquarterid: XQW.Guid;
  tc_tcfiscalyearid_guid: XQW.Guid;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface tc_TCFiscalQuarter_Expand {
  ovs_BookableResourceBooking_PlannedFiscalQuar: WebExpand<tc_TCFiscalQuarter_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { ovs_BookableResourceBooking_PlannedFiscalQuar: BookableResourceBooking_Result[] }>;
  ovs_BookableResourceBooking_RevisedQuarter_tc: WebExpand<tc_TCFiscalQuarter_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { ovs_BookableResourceBooking_RevisedQuarter_tc: BookableResourceBooking_Result[] }>;
  ovs_msdyn_workorder_CurrentFiscalQuarter_tc_T: WebExpand<tc_TCFiscalQuarter_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_msdyn_workorder_CurrentFiscalQuarter_tc_T: msdyn_workorder_Result[] }>;
  ovs_msdyn_workorder_FiscalQuarter_tc_TCFiscal: WebExpand<tc_TCFiscalQuarter_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_msdyn_workorder_FiscalQuarter_tc_TCFiscal: msdyn_workorder_Result[] }>;
  ovs_tc_tcfiscalquarter_msdyn_workorder: WebExpand<tc_TCFiscalQuarter_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_tc_tcfiscalquarter_msdyn_workorder: msdyn_workorder_Result[] }>;
  tc_TCFiscalYearId: WebExpand<tc_TCFiscalQuarter_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { tc_TCFiscalYearId: tc_TCFiscalYear_Result }>;
}
interface tc_TCFiscalQuarter_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  tc_quarterend_formatted?: string;
  tc_quarterstart_formatted?: string;
  tc_tcfiscalyearid_formatted?: string;
}
interface tc_TCFiscalQuarter_Result extends tc_TCFiscalQuarter_Base, tc_TCFiscalQuarter_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  tc_tcfiscalyearid_guid: string | null;
}
interface tc_TCFiscalQuarter_RelatedOne {
  tc_TCFiscalYearId: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
}
interface tc_TCFiscalQuarter_RelatedMany {
  ovs_BookableResourceBooking_PlannedFiscalQuar: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  ovs_BookableResourceBooking_RevisedQuarter_tc: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  ovs_msdyn_workorder_CurrentFiscalQuarter_tc_T: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_msdyn_workorder_FiscalQuarter_tc_TCFiscal: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_tc_tcfiscalquarter_msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  tc_tcfiscalquarters: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
}
interface WebEntitiesRelated {
  tc_tcfiscalquarters: WebMappingRelated<tc_TCFiscalQuarter_RelatedOne,tc_TCFiscalQuarter_RelatedMany>;
}
interface WebEntitiesCUDA {
  tc_tcfiscalquarters: WebMappingCUDA<tc_TCFiscalQuarter_Create,tc_TCFiscalQuarter_Update,tc_TCFiscalQuarter_Select>;
}
