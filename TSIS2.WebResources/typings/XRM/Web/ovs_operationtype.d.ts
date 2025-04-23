interface ovs_operationtype_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_name?: string | null;
  ovs_operationtypeid?: string | null;
  ovs_operationtypenameenglish?: string | null;
  ovs_operationtypenamefrench?: string | null;
  statecode?: ovs_operationtype_statecode | null;
  statuscode?: ovs_operationtype_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_regulated?: boolean | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_operationtype_Relationships {
  msdyn_workorderservicetask_operationtypef?: msdyn_workorderservicetask_Result[] | null;
  ovs_msdyn_workorder_operationtype?: msdyn_workorder_Result[] | null;
  ovs_ovs_operationtype_ovs_operation?: ovs_operation_Result[] | null;
  ts_EntityRisk_ovs_operationtype_ovs_operationtype?: ts_EntityRisk_Result[] | null;
  ts_account_PrincipalOperationType_ovs_operat?: Account_Result[] | null;
  ts_entityriskfrequency_OperationType_ovs_operationtype?: ts_EntityRiskFrequency_Result[] | null;
  ts_infraction_operationtype_ovs_operationtype?: ts_infraction_Result[] | null;
  ts_ovs_Finding_ovs_operationtype_ovs_operati?: ovs_Finding_Result[] | null;
  ts_ovs_operationtype_incident_OperationType?: Incident_Result[] | null;
  ts_ovs_operationtype_msdyn_workorderservicetask_AOCOperationType?: msdyn_workorderservicetask_Result[] | null;
  ts_ovs_operationtype_qm_rclegislation_qm_rcl?: qm_rclegislation_Result[] | null;
  ts_ovs_operationtype_ts_case_OperationType?: ts_case_Result[] | null;
  ts_ovs_operationtype_ts_workordercreationwiz?: ts_workordercreationwizard_Result[] | null;
  ts_ovs_operationtypes_msdyn_incidenttypes?: msdyn_incidenttype_Result[] | null;
  ts_securityincident_operationtype_ovs_operat?: ts_securityincident_Result[] | null;
  ts_suggestedinspection_operationtype?: ts_SuggestedInspection_Result[] | null;
  ts_ts_operationactivity_OperationType_ovs_op?: ts_OperationActivity_Result[] | null;
  ts_ts_planningdata_OperationType_ovs_operati?: ts_PlanningData_Result[] | null;
  ts_ts_riskcategory_OperationType_ovs_operati?: ts_RiskCategory_Result[] | null;
}
interface ovs_operationtype extends ovs_operationtype_Base, ovs_operationtype_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_OperationTypeRiskRating_bind$ts_riskratings?: string | null;
  ts_ovs_lob_bind$ovs_lobs?: string | null;
  ts_riskcriteria_bind$ts_riskcriterias?: string | null;
}
interface ovs_operationtype_Create extends ovs_operationtype {
}
interface ovs_operationtype_Update extends ovs_operationtype {
}
interface ovs_operationtype_Select {
  createdby_guid: WebAttribute<ovs_operationtype_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_operationtype_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_operationtype_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_operationtype_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_operationtype_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_operationtype_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_operationtype_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_operationtype_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_name: WebAttribute<ovs_operationtype_Select, { ovs_name: string | null }, {  }>;
  ovs_operationtypeid: WebAttribute<ovs_operationtype_Select, { ovs_operationtypeid: string | null }, {  }>;
  ovs_operationtypenameenglish: WebAttribute<ovs_operationtype_Select, { ovs_operationtypenameenglish: string | null }, {  }>;
  ovs_operationtypenamefrench: WebAttribute<ovs_operationtype_Select, { ovs_operationtypenamefrench: string | null }, {  }>;
  ownerid_guid: WebAttribute<ovs_operationtype_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_operationtype_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_operationtype_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_operationtype_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_operationtype_Select, { statecode: ovs_operationtype_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_operationtype_Select, { statuscode: ovs_operationtype_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_operationtype_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_operationtyperiskrating_guid: WebAttribute<ovs_operationtype_Select, { ts_operationtyperiskrating_guid: string | null }, { ts_operationtyperiskrating_formatted?: string }>;
  ts_ovs_lob_guid: WebAttribute<ovs_operationtype_Select, { ts_ovs_lob_guid: string | null }, { ts_ovs_lob_formatted?: string }>;
  ts_regulated: WebAttribute<ovs_operationtype_Select, { ts_regulated: boolean | null }, {  }>;
  ts_riskcriteria_guid: WebAttribute<ovs_operationtype_Select, { ts_riskcriteria_guid: string | null }, { ts_riskcriteria_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ovs_operationtype_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_operationtype_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_operationtype_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_name: string;
  ovs_operationtypeid: XQW.Guid;
  ovs_operationtypenameenglish: string;
  ovs_operationtypenamefrench: string;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_operationtype_statecode;
  statuscode: ovs_operationtype_statuscode;
  timezoneruleversionnumber: number;
  ts_operationtyperiskrating_guid: XQW.Guid;
  ts_ovs_lob_guid: XQW.Guid;
  ts_regulated: boolean;
  ts_riskcriteria_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_operationtype_Expand {
  createdby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_workorderservicetask_operationtypef: WebExpand<ovs_operationtype_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { msdyn_workorderservicetask_operationtypef: msdyn_workorderservicetask_Result[] }>;
  ovs_msdyn_workorder_operationtype: WebExpand<ovs_operationtype_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_msdyn_workorder_operationtype: msdyn_workorder_Result[] }>;
  ovs_ovs_operationtype_ovs_operation: WebExpand<ovs_operationtype_Expand, ovs_operation_Select, ovs_operation_Filter, { ovs_ovs_operationtype_ovs_operation: ovs_operation_Result[] }>;
  ownerid: WebExpand<ovs_operationtype_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ovs_operationtype_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ovs_operationtype_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ovs_operationtype_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_EntityRisk_ovs_operationtype_ovs_operationtype: WebExpand<ovs_operationtype_Expand, ts_EntityRisk_Select, ts_EntityRisk_Filter, { ts_EntityRisk_ovs_operationtype_ovs_operationtype: ts_EntityRisk_Result[] }>;
  ts_account_PrincipalOperationType_ovs_operat: WebExpand<ovs_operationtype_Expand, Account_Select, Account_Filter, { ts_account_PrincipalOperationType_ovs_operat: Account_Result[] }>;
  ts_entityriskfrequency_OperationType_ovs_operationtype: WebExpand<ovs_operationtype_Expand, ts_EntityRiskFrequency_Select, ts_EntityRiskFrequency_Filter, { ts_entityriskfrequency_OperationType_ovs_operationtype: ts_EntityRiskFrequency_Result[] }>;
  ts_infraction_operationtype_ovs_operationtype: WebExpand<ovs_operationtype_Expand, ts_infraction_Select, ts_infraction_Filter, { ts_infraction_operationtype_ovs_operationtype: ts_infraction_Result[] }>;
  ts_ovs_Finding_ovs_operationtype_ovs_operati: WebExpand<ovs_operationtype_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ovs_Finding_ovs_operationtype_ovs_operati: ovs_Finding_Result[] }>;
  ts_ovs_operationtype_incident_OperationType: WebExpand<ovs_operationtype_Expand, Incident_Select, Incident_Filter, { ts_ovs_operationtype_incident_OperationType: Incident_Result[] }>;
  ts_ovs_operationtype_msdyn_workorderservicetask_AOCOperationType: WebExpand<ovs_operationtype_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ts_ovs_operationtype_msdyn_workorderservicetask_AOCOperationType: msdyn_workorderservicetask_Result[] }>;
  ts_ovs_operationtype_qm_rclegislation_qm_rcl: WebExpand<ovs_operationtype_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { ts_ovs_operationtype_qm_rclegislation_qm_rcl: qm_rclegislation_Result[] }>;
  ts_ovs_operationtype_ts_case_OperationType: WebExpand<ovs_operationtype_Expand, ts_case_Select, ts_case_Filter, { ts_ovs_operationtype_ts_case_OperationType: ts_case_Result[] }>;
  ts_ovs_operationtype_ts_workordercreationwiz: WebExpand<ovs_operationtype_Expand, ts_workordercreationwizard_Select, ts_workordercreationwizard_Filter, { ts_ovs_operationtype_ts_workordercreationwiz: ts_workordercreationwizard_Result[] }>;
  ts_ovs_operationtypes_msdyn_incidenttypes: WebExpand<ovs_operationtype_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_ovs_operationtypes_msdyn_incidenttypes: msdyn_incidenttype_Result[] }>;
  ts_securityincident_operationtype_ovs_operat: WebExpand<ovs_operationtype_Expand, ts_securityincident_Select, ts_securityincident_Filter, { ts_securityincident_operationtype_ovs_operat: ts_securityincident_Result[] }>;
  ts_suggestedinspection_operationtype: WebExpand<ovs_operationtype_Expand, ts_SuggestedInspection_Select, ts_SuggestedInspection_Filter, { ts_suggestedinspection_operationtype: ts_SuggestedInspection_Result[] }>;
  ts_ts_operationactivity_OperationType_ovs_op: WebExpand<ovs_operationtype_Expand, ts_OperationActivity_Select, ts_OperationActivity_Filter, { ts_ts_operationactivity_OperationType_ovs_op: ts_OperationActivity_Result[] }>;
  ts_ts_planningdata_OperationType_ovs_operati: WebExpand<ovs_operationtype_Expand, ts_PlanningData_Select, ts_PlanningData_Filter, { ts_ts_planningdata_OperationType_ovs_operati: ts_PlanningData_Result[] }>;
  ts_ts_riskcategory_OperationType_ovs_operati: WebExpand<ovs_operationtype_Expand, ts_RiskCategory_Select, ts_RiskCategory_Filter, { ts_ts_riskcategory_OperationType_ovs_operati: ts_RiskCategory_Result[] }>;
}
interface ovs_operationtype_FormattedResult {
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
  ts_operationtyperiskrating_formatted?: string;
  ts_ovs_lob_formatted?: string;
  ts_riskcriteria_formatted?: string;
}
interface ovs_operationtype_Result extends ovs_operationtype_Base, ovs_operationtype_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_operationtyperiskrating_guid: string | null;
  ts_ovs_lob_guid: string | null;
  ts_riskcriteria_guid: string | null;
}
interface ovs_operationtype_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ovs_operationtype_RelatedMany {
  msdyn_workorderservicetask_operationtypef: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  ovs_msdyn_workorder_operationtype: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_ovs_operationtype_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_EntityRisk_ovs_operationtype_ovs_operationtype: WebMappingRetrieve<ts_EntityRisk_Select,ts_EntityRisk_Expand,ts_EntityRisk_Filter,ts_EntityRisk_Fixed,ts_EntityRisk_Result,ts_EntityRisk_FormattedResult>;
  ts_account_PrincipalOperationType_ovs_operat: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_entityriskfrequency_OperationType_ovs_operationtype: WebMappingRetrieve<ts_EntityRiskFrequency_Select,ts_EntityRiskFrequency_Expand,ts_EntityRiskFrequency_Filter,ts_EntityRiskFrequency_Fixed,ts_EntityRiskFrequency_Result,ts_EntityRiskFrequency_FormattedResult>;
  ts_infraction_operationtype_ovs_operationtype: WebMappingRetrieve<ts_infraction_Select,ts_infraction_Expand,ts_infraction_Filter,ts_infraction_Fixed,ts_infraction_Result,ts_infraction_FormattedResult>;
  ts_ovs_Finding_ovs_operationtype_ovs_operati: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_ovs_operationtype_incident_OperationType: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_ovs_operationtype_msdyn_workorderservicetask_AOCOperationType: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  ts_ovs_operationtype_qm_rclegislation_qm_rcl: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
  ts_ovs_operationtype_ts_case_OperationType: WebMappingRetrieve<ts_case_Select,ts_case_Expand,ts_case_Filter,ts_case_Fixed,ts_case_Result,ts_case_FormattedResult>;
  ts_ovs_operationtype_ts_workordercreationwiz: WebMappingRetrieve<ts_workordercreationwizard_Select,ts_workordercreationwizard_Expand,ts_workordercreationwizard_Filter,ts_workordercreationwizard_Fixed,ts_workordercreationwizard_Result,ts_workordercreationwizard_FormattedResult>;
  ts_ovs_operationtypes_msdyn_incidenttypes: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_securityincident_operationtype_ovs_operat: WebMappingRetrieve<ts_securityincident_Select,ts_securityincident_Expand,ts_securityincident_Filter,ts_securityincident_Fixed,ts_securityincident_Result,ts_securityincident_FormattedResult>;
  ts_suggestedinspection_operationtype: WebMappingRetrieve<ts_SuggestedInspection_Select,ts_SuggestedInspection_Expand,ts_SuggestedInspection_Filter,ts_SuggestedInspection_Fixed,ts_SuggestedInspection_Result,ts_SuggestedInspection_FormattedResult>;
  ts_ts_operationactivity_OperationType_ovs_op: WebMappingRetrieve<ts_OperationActivity_Select,ts_OperationActivity_Expand,ts_OperationActivity_Filter,ts_OperationActivity_Fixed,ts_OperationActivity_Result,ts_OperationActivity_FormattedResult>;
  ts_ts_planningdata_OperationType_ovs_operati: WebMappingRetrieve<ts_PlanningData_Select,ts_PlanningData_Expand,ts_PlanningData_Filter,ts_PlanningData_Fixed,ts_PlanningData_Result,ts_PlanningData_FormattedResult>;
  ts_ts_riskcategory_OperationType_ovs_operati: WebMappingRetrieve<ts_RiskCategory_Select,ts_RiskCategory_Expand,ts_RiskCategory_Filter,ts_RiskCategory_Fixed,ts_RiskCategory_Result,ts_RiskCategory_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ovs_operationtypes: WebMappingRetrieve<ovs_operationtype_Select,ovs_operationtype_Expand,ovs_operationtype_Filter,ovs_operationtype_Fixed,ovs_operationtype_Result,ovs_operationtype_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_operationtypes: WebMappingRelated<ovs_operationtype_RelatedOne,ovs_operationtype_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_operationtypes: WebMappingCUDA<ovs_operationtype_Create,ovs_operationtype_Update,ovs_operationtype_Select>;
}
