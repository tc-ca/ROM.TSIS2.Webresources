interface qm_rclegislation_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_additionalmetadataetxt?: string | null;
  qm_additionalmetadataftxt?: string | null;
  qm_historicalnoteetxt?: string | null;
  qm_historicalnoteftxt?: string | null;
  qm_inforcedte?: Date | null;
  qm_justicefid?: number | null;
  qm_justiceid?: number | null;
  qm_lastamendeddte?: Date | null;
  qm_legislationetxt?: string | null;
  qm_legislationftxt?: string | null;
  qm_legislationlbl?: string | null;
  qm_name?: string | null;
  qm_ordernbr?: number | null;
  qm_rclegislationid?: string | null;
  qm_violationdisplaytexten?: string | null;
  qm_violationdisplaytextfr?: string | null;
  statecode?: qm_rclegislation_statecode | null;
  statuscode?: qm_rclegislation_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_classification?: ts_classification | null;
  ts_importkey?: string | null;
  ts_nameenglish?: string | null;
  ts_namefrench?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_rclegislation_Relationships {
  ovs_msdyn_servicetasktype_qm_rclegislation?: msdyn_servicetasktype_Result[] | null;
  qm_qm_rclegislation_qm_rclegislation?: qm_rclegislation_Result[] | null;
  qm_rcParentLegislationId?: qm_rclegislation_Result | null;
  qm_rclegislation_connections1?: Connection_Result[] | null;
  qm_rclegislation_connections2?: Connection_Result[] | null;
  qm_rclegislation_enablingprovision?: qm_rclegislation_Result[] | null;
  ts_ovs_operation_qm_rclegislation_qm_rclegis?: ovs_operation_Result[] | null;
  ts_qm_rclegislation_qm_rclegislation_ovs_Fin?: ovs_Finding_Result[] | null;
  ts_related_causes?: qm_rclegislation_Result[] | null;
  ts_related_references?: qm_rclegislation_Result[] | null;
  ts_workorderservicetask_qm_rclegislation?: msdyn_workorderservicetask_Result[] | null;
}
interface qm_rclegislation extends qm_rclegislation_Base, qm_rclegislation_Relationships {
  qm_enablingprovision_bind$qm_rclegislations?: string | null;
  qm_rcParentLegislationId_bind$qm_rclegislations?: string | null;
  qm_tylegislationsourceId_bind$qm_tylegislationsources?: string | null;
  qm_tylegislationtypeId_bind$qm_tylegislationtypes?: string | null;
  ts_ProvisionCategory_bind$ts_provisioncategories?: string | null;
  ts_msdyn_requirementcharacteristic_bind$msdyn_requirementcharacteristics?: string | null;
}
interface qm_rclegislation_Create extends qm_rclegislation {
}
interface qm_rclegislation_Update extends qm_rclegislation {
}
interface qm_rclegislation_Select {
  createdby_guid: WebAttribute<qm_rclegislation_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_rclegislation_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_rclegislation_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_rclegislation_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_rclegislation_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_rclegislation_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_rclegislation_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_rclegislation_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_rclegislation_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_additionalmetadataetxt: WebAttribute<qm_rclegislation_Select, { qm_additionalmetadataetxt: string | null }, {  }>;
  qm_additionalmetadataftxt: WebAttribute<qm_rclegislation_Select, { qm_additionalmetadataftxt: string | null }, {  }>;
  qm_enablingprovision_guid: WebAttribute<qm_rclegislation_Select, { qm_enablingprovision_guid: string | null }, { qm_enablingprovision_formatted?: string }>;
  qm_historicalnoteetxt: WebAttribute<qm_rclegislation_Select, { qm_historicalnoteetxt: string | null }, {  }>;
  qm_historicalnoteftxt: WebAttribute<qm_rclegislation_Select, { qm_historicalnoteftxt: string | null }, {  }>;
  qm_inforcedte: WebAttribute<qm_rclegislation_Select, { qm_inforcedte: Date | null }, { qm_inforcedte_formatted?: string }>;
  qm_justicefid: WebAttribute<qm_rclegislation_Select, { qm_justicefid: number | null }, {  }>;
  qm_justiceid: WebAttribute<qm_rclegislation_Select, { qm_justiceid: number | null }, {  }>;
  qm_lastamendeddte: WebAttribute<qm_rclegislation_Select, { qm_lastamendeddte: Date | null }, { qm_lastamendeddte_formatted?: string }>;
  qm_legislationetxt: WebAttribute<qm_rclegislation_Select, { qm_legislationetxt: string | null }, {  }>;
  qm_legislationftxt: WebAttribute<qm_rclegislation_Select, { qm_legislationftxt: string | null }, {  }>;
  qm_legislationlbl: WebAttribute<qm_rclegislation_Select, { qm_legislationlbl: string | null }, {  }>;
  qm_name: WebAttribute<qm_rclegislation_Select, { qm_name: string | null }, {  }>;
  qm_ordernbr: WebAttribute<qm_rclegislation_Select, { qm_ordernbr: number | null }, {  }>;
  qm_rclegislationid: WebAttribute<qm_rclegislation_Select, { qm_rclegislationid: string | null }, {  }>;
  qm_rcparentlegislationid_guid: WebAttribute<qm_rclegislation_Select, { qm_rcparentlegislationid_guid: string | null }, { qm_rcparentlegislationid_formatted?: string }>;
  qm_tylegislationsourceid_guid: WebAttribute<qm_rclegislation_Select, { qm_tylegislationsourceid_guid: string | null }, { qm_tylegislationsourceid_formatted?: string }>;
  qm_tylegislationtypeid_guid: WebAttribute<qm_rclegislation_Select, { qm_tylegislationtypeid_guid: string | null }, { qm_tylegislationtypeid_formatted?: string }>;
  qm_violationdisplaytexten: WebAttribute<qm_rclegislation_Select, { qm_violationdisplaytexten: string | null }, {  }>;
  qm_violationdisplaytextfr: WebAttribute<qm_rclegislation_Select, { qm_violationdisplaytextfr: string | null }, {  }>;
  statecode: WebAttribute<qm_rclegislation_Select, { statecode: qm_rclegislation_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_rclegislation_Select, { statuscode: qm_rclegislation_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_rclegislation_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_classification: WebAttribute<qm_rclegislation_Select, { ts_classification: ts_classification | null }, { ts_classification_formatted?: string }>;
  ts_importkey: WebAttribute<qm_rclegislation_Select, { ts_importkey: string | null }, {  }>;
  ts_msdyn_requirementcharacteristic_guid: WebAttribute<qm_rclegislation_Select, { ts_msdyn_requirementcharacteristic_guid: string | null }, { ts_msdyn_requirementcharacteristic_formatted?: string }>;
  ts_nameenglish: WebAttribute<qm_rclegislation_Select, { ts_nameenglish: string | null }, {  }>;
  ts_namefrench: WebAttribute<qm_rclegislation_Select, { ts_namefrench: string | null }, {  }>;
  ts_provisioncategory_guid: WebAttribute<qm_rclegislation_Select, { ts_provisioncategory_guid: string | null }, { ts_provisioncategory_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<qm_rclegislation_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_rclegislation_Select, { versionnumber: number | null }, {  }>;
}
interface qm_rclegislation_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_additionalmetadataetxt: string;
  qm_additionalmetadataftxt: string;
  qm_enablingprovision_guid: XQW.Guid;
  qm_historicalnoteetxt: string;
  qm_historicalnoteftxt: string;
  qm_inforcedte: Date;
  qm_justicefid: number;
  qm_justiceid: number;
  qm_lastamendeddte: Date;
  qm_legislationetxt: string;
  qm_legislationftxt: string;
  qm_legislationlbl: string;
  qm_name: string;
  qm_ordernbr: number;
  qm_rclegislationid: XQW.Guid;
  qm_rcparentlegislationid_guid: XQW.Guid;
  qm_tylegislationsourceid_guid: XQW.Guid;
  qm_tylegislationtypeid_guid: XQW.Guid;
  qm_violationdisplaytexten: string;
  qm_violationdisplaytextfr: string;
  statecode: qm_rclegislation_statecode;
  statuscode: qm_rclegislation_statuscode;
  timezoneruleversionnumber: number;
  ts_classification: ts_classification;
  ts_importkey: string;
  ts_msdyn_requirementcharacteristic_guid: XQW.Guid;
  ts_nameenglish: string;
  ts_namefrench: string;
  ts_provisioncategory_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_rclegislation_Expand {
  createdby: WebExpand<qm_rclegislation_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_rclegislation_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_rclegislation_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_rclegislation_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_msdyn_servicetasktype_qm_rclegislation: WebExpand<qm_rclegislation_Expand, msdyn_servicetasktype_Select, msdyn_servicetasktype_Filter, { ovs_msdyn_servicetasktype_qm_rclegislation: msdyn_servicetasktype_Result[] }>;
  qm_enablingprovision: WebExpand<qm_rclegislation_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_enablingprovision: qm_rclegislation_Result }>;
  qm_qm_rclegislation_qm_rclegislation: WebExpand<qm_rclegislation_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_qm_rclegislation_qm_rclegislation: qm_rclegislation_Result[] }>;
  qm_rcParentLegislationId: WebExpand<qm_rclegislation_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_rcParentLegislationId: qm_rclegislation_Result }>;
  qm_rclegislation_connections1: WebExpand<qm_rclegislation_Expand, Connection_Select, Connection_Filter, { qm_rclegislation_connections1: Connection_Result[] }>;
  qm_rclegislation_connections2: WebExpand<qm_rclegislation_Expand, Connection_Select, Connection_Filter, { qm_rclegislation_connections2: Connection_Result[] }>;
  qm_rclegislation_enablingprovision: WebExpand<qm_rclegislation_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_rclegislation_enablingprovision: qm_rclegislation_Result[] }>;
  ts_ovs_operation_qm_rclegislation_qm_rclegis: WebExpand<qm_rclegislation_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_ovs_operation_qm_rclegislation_qm_rclegis: ovs_operation_Result[] }>;
  ts_qm_rclegislation_qm_rclegislation_ovs_Fin: WebExpand<qm_rclegislation_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_qm_rclegislation_qm_rclegislation_ovs_Fin: ovs_Finding_Result[] }>;
  ts_related_causes: WebExpand<qm_rclegislation_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { ts_related_causes: qm_rclegislation_Result[] }>;
  ts_related_references: WebExpand<qm_rclegislation_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { ts_related_references: qm_rclegislation_Result[] }>;
  ts_workorderservicetask_qm_rclegislation: WebExpand<qm_rclegislation_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ts_workorderservicetask_qm_rclegislation: msdyn_workorderservicetask_Result[] }>;
}
interface qm_rclegislation_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  qm_enablingprovision_formatted?: string;
  qm_inforcedte_formatted?: string;
  qm_lastamendeddte_formatted?: string;
  qm_rcparentlegislationid_formatted?: string;
  qm_tylegislationsourceid_formatted?: string;
  qm_tylegislationtypeid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  ts_classification_formatted?: string;
  ts_msdyn_requirementcharacteristic_formatted?: string;
  ts_provisioncategory_formatted?: string;
}
interface qm_rclegislation_Result extends qm_rclegislation_Base, qm_rclegislation_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  qm_enablingprovision_guid: string | null;
  qm_rcparentlegislationid_guid: string | null;
  qm_tylegislationsourceid_guid: string | null;
  qm_tylegislationtypeid_guid: string | null;
  ts_msdyn_requirementcharacteristic_guid: string | null;
  ts_provisioncategory_guid: string | null;
}
interface qm_rclegislation_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  qm_enablingprovision: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
  qm_rcParentLegislationId: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface qm_rclegislation_RelatedMany {
  ovs_msdyn_servicetasktype_qm_rclegislation: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
  qm_qm_rclegislation_qm_rclegislation: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
  qm_rclegislation_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  qm_rclegislation_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  qm_rclegislation_enablingprovision: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
  ts_ovs_operation_qm_rclegislation_qm_rclegis: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_qm_rclegislation_qm_rclegislation_ovs_Fin: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_related_causes: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
  ts_related_references: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
  ts_workorderservicetask_qm_rclegislation: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_rclegislations: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_rclegislations: WebMappingRelated<qm_rclegislation_RelatedOne,qm_rclegislation_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_rclegislations: WebMappingCUDA<qm_rclegislation_Create,qm_rclegislation_Update,qm_rclegislation_Select>;
}
