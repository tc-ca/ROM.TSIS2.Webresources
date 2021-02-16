interface WebMappingRetrieve<ISelect, IExpand, IFilter, IFixed, Result, FormattedResult> {
}
interface WebMappingCUDA<ICreate, IUpdate, ISelect> {
}
interface WebMappingRelated<ISingle, IMultiple> {
}
interface WebEntity {
}
interface WebEntity_Fixed {
  "@odata.etag": string;
}
interface Account_Base extends WebEntity {
}
interface Account_Fixed extends WebEntity_Fixed {
  accountid: string;
}
interface Account extends Account_Base, Account_Relationships {
}
interface Account_Relationships {
}
interface Account_Result extends Account_Base, Account_Relationships {
}
interface Account_FormattedResult {
}
interface Account_Select {
}
interface Account_Expand {
}
interface Account_Filter {
}
interface Account_Create extends Account {
}
interface Account_Update extends Account {
}
interface ActivityParty_Base extends WebEntity {
}
interface ActivityParty_Fixed extends WebEntity_Fixed {
  activitypartyid: string;
}
interface ActivityParty extends ActivityParty_Base, ActivityParty_Relationships {
}
interface ActivityParty_Relationships {
}
interface ActivityParty_Result extends ActivityParty_Base, ActivityParty_Relationships {
}
interface ActivityParty_FormattedResult {
}
interface ActivityParty_Select {
}
interface ActivityParty_Expand {
}
interface ActivityParty_Filter {
}
interface ActivityParty_Create extends ActivityParty {
}
interface ActivityParty_Update extends ActivityParty {
}
interface BookableResource_Base extends WebEntity {
}
interface BookableResource_Fixed extends WebEntity_Fixed {
  bookableresourceid: string;
}
interface BookableResource extends BookableResource_Base, BookableResource_Relationships {
}
interface BookableResource_Relationships {
}
interface BookableResource_Result extends BookableResource_Base, BookableResource_Relationships {
}
interface BookableResource_FormattedResult {
}
interface BookableResource_Select {
}
interface BookableResource_Expand {
}
interface BookableResource_Filter {
}
interface BookableResource_Create extends BookableResource {
}
interface BookableResource_Update extends BookableResource {
}
interface BookableResourceBooking_Base extends WebEntity {
}
interface BookableResourceBooking_Fixed extends WebEntity_Fixed {
  bookableresourcebookingid: string;
}
interface BookableResourceBooking extends BookableResourceBooking_Base, BookableResourceBooking_Relationships {
}
interface BookableResourceBooking_Relationships {
}
interface BookableResourceBooking_Result extends BookableResourceBooking_Base, BookableResourceBooking_Relationships {
}
interface BookableResourceBooking_FormattedResult {
}
interface BookableResourceBooking_Select {
}
interface BookableResourceBooking_Expand {
}
interface BookableResourceBooking_Filter {
}
interface BookableResourceBooking_Create extends BookableResourceBooking {
}
interface BookableResourceBooking_Update extends BookableResourceBooking {
}
interface Contact_Base extends WebEntity {
}
interface Contact_Fixed extends WebEntity_Fixed {
  contactid: string;
}
interface Contact extends Contact_Base, Contact_Relationships {
}
interface Contact_Relationships {
}
interface Contact_Result extends Contact_Base, Contact_Relationships {
}
interface Contact_FormattedResult {
}
interface Contact_Select {
}
interface Contact_Expand {
}
interface Contact_Filter {
}
interface Contact_Create extends Contact {
}
interface Contact_Update extends Contact {
}
interface Incident_Base extends WebEntity {
}
interface Incident_Fixed extends WebEntity_Fixed {
  incidentid: string;
}
interface Incident extends Incident_Base, Incident_Relationships {
}
interface Incident_Relationships {
}
interface Incident_Result extends Incident_Base, Incident_Relationships {
}
interface Incident_FormattedResult {
}
interface Incident_Select {
}
interface Incident_Expand {
}
interface Incident_Filter {
}
interface Incident_Create extends Incident {
}
interface Incident_Update extends Incident {
}
interface msdyn_incidenttype_Base extends WebEntity {
}
interface msdyn_incidenttype_Fixed extends WebEntity_Fixed {
  msdyn_incidenttypeid: string;
}
interface msdyn_incidenttype extends msdyn_incidenttype_Base, msdyn_incidenttype_Relationships {
}
interface msdyn_incidenttype_Relationships {
}
interface msdyn_incidenttype_Result extends msdyn_incidenttype_Base, msdyn_incidenttype_Relationships {
}
interface msdyn_incidenttype_FormattedResult {
}
interface msdyn_incidenttype_Select {
}
interface msdyn_incidenttype_Expand {
}
interface msdyn_incidenttype_Filter {
}
interface msdyn_incidenttype_Create extends msdyn_incidenttype {
}
interface msdyn_incidenttype_Update extends msdyn_incidenttype {
}
interface msdyn_incidenttypeservicetask_Base extends WebEntity {
}
interface msdyn_incidenttypeservicetask_Fixed extends WebEntity_Fixed {
  msdyn_incidenttypeservicetaskid: string;
}
interface msdyn_incidenttypeservicetask extends msdyn_incidenttypeservicetask_Base, msdyn_incidenttypeservicetask_Relationships {
}
interface msdyn_incidenttypeservicetask_Relationships {
}
interface msdyn_incidenttypeservicetask_Result extends msdyn_incidenttypeservicetask_Base, msdyn_incidenttypeservicetask_Relationships {
}
interface msdyn_incidenttypeservicetask_FormattedResult {
}
interface msdyn_incidenttypeservicetask_Select {
}
interface msdyn_incidenttypeservicetask_Expand {
}
interface msdyn_incidenttypeservicetask_Filter {
}
interface msdyn_incidenttypeservicetask_Create extends msdyn_incidenttypeservicetask {
}
interface msdyn_incidenttypeservicetask_Update extends msdyn_incidenttypeservicetask {
}
interface msdyn_servicetasktype_Base extends WebEntity {
}
interface msdyn_servicetasktype_Fixed extends WebEntity_Fixed {
  msdyn_servicetasktypeid: string;
}
interface msdyn_servicetasktype extends msdyn_servicetasktype_Base, msdyn_servicetasktype_Relationships {
}
interface msdyn_servicetasktype_Relationships {
}
interface msdyn_servicetasktype_Result extends msdyn_servicetasktype_Base, msdyn_servicetasktype_Relationships {
}
interface msdyn_servicetasktype_FormattedResult {
}
interface msdyn_servicetasktype_Select {
}
interface msdyn_servicetasktype_Expand {
}
interface msdyn_servicetasktype_Filter {
}
interface msdyn_servicetasktype_Create extends msdyn_servicetasktype {
}
interface msdyn_servicetasktype_Update extends msdyn_servicetasktype {
}
interface msdyn_workorder_Base extends WebEntity {
}
interface msdyn_workorder_Fixed extends WebEntity_Fixed {
  msdyn_workorderid: string;
}
interface msdyn_workorder extends msdyn_workorder_Base, msdyn_workorder_Relationships {
}
interface msdyn_workorder_Relationships {
}
interface msdyn_workorder_Result extends msdyn_workorder_Base, msdyn_workorder_Relationships {
}
interface msdyn_workorder_FormattedResult {
}
interface msdyn_workorder_Select {
}
interface msdyn_workorder_Expand {
}
interface msdyn_workorder_Filter {
}
interface msdyn_workorder_Create extends msdyn_workorder {
}
interface msdyn_workorder_Update extends msdyn_workorder {
}
interface msdyn_workorderincident_Base extends WebEntity {
}
interface msdyn_workorderincident_Fixed extends WebEntity_Fixed {
  msdyn_workorderincidentid: string;
}
interface msdyn_workorderincident extends msdyn_workorderincident_Base, msdyn_workorderincident_Relationships {
}
interface msdyn_workorderincident_Relationships {
}
interface msdyn_workorderincident_Result extends msdyn_workorderincident_Base, msdyn_workorderincident_Relationships {
}
interface msdyn_workorderincident_FormattedResult {
}
interface msdyn_workorderincident_Select {
}
interface msdyn_workorderincident_Expand {
}
interface msdyn_workorderincident_Filter {
}
interface msdyn_workorderincident_Create extends msdyn_workorderincident {
}
interface msdyn_workorderincident_Update extends msdyn_workorderincident {
}
interface msdyn_workorderservicetask_Base extends WebEntity {
}
interface msdyn_workorderservicetask_Fixed extends WebEntity_Fixed {
  msdyn_workorderservicetaskid: string;
}
interface msdyn_workorderservicetask extends msdyn_workorderservicetask_Base, msdyn_workorderservicetask_Relationships {
}
interface msdyn_workorderservicetask_Relationships {
}
interface msdyn_workorderservicetask_Result extends msdyn_workorderservicetask_Base, msdyn_workorderservicetask_Relationships {
}
interface msdyn_workorderservicetask_FormattedResult {
}
interface msdyn_workorderservicetask_Select {
}
interface msdyn_workorderservicetask_Expand {
}
interface msdyn_workorderservicetask_Filter {
}
interface msdyn_workorderservicetask_Create extends msdyn_workorderservicetask {
}
interface msdyn_workorderservicetask_Update extends msdyn_workorderservicetask {
}
interface msdyn_workordersubstatus_Base extends WebEntity {
}
interface msdyn_workordersubstatus_Fixed extends WebEntity_Fixed {
  msdyn_workordersubstatusid: string;
}
interface msdyn_workordersubstatus extends msdyn_workordersubstatus_Base, msdyn_workordersubstatus_Relationships {
}
interface msdyn_workordersubstatus_Relationships {
}
interface msdyn_workordersubstatus_Result extends msdyn_workordersubstatus_Base, msdyn_workordersubstatus_Relationships {
}
interface msdyn_workordersubstatus_FormattedResult {
}
interface msdyn_workordersubstatus_Select {
}
interface msdyn_workordersubstatus_Expand {
}
interface msdyn_workordersubstatus_Filter {
}
interface msdyn_workordersubstatus_Create extends msdyn_workordersubstatus {
}
interface msdyn_workordersubstatus_Update extends msdyn_workordersubstatus {
}
interface msdyn_workordertype_Base extends WebEntity {
}
interface msdyn_workordertype_Fixed extends WebEntity_Fixed {
  msdyn_workordertypeid: string;
}
interface msdyn_workordertype extends msdyn_workordertype_Base, msdyn_workordertype_Relationships {
}
interface msdyn_workordertype_Relationships {
}
interface msdyn_workordertype_Result extends msdyn_workordertype_Base, msdyn_workordertype_Relationships {
}
interface msdyn_workordertype_FormattedResult {
}
interface msdyn_workordertype_Select {
}
interface msdyn_workordertype_Expand {
}
interface msdyn_workordertype_Filter {
}
interface msdyn_workordertype_Create extends msdyn_workordertype {
}
interface msdyn_workordertype_Update extends msdyn_workordertype {
}
interface ovs_cancellationrequest_Base extends WebEntity {
}
interface ovs_cancellationrequest_Fixed extends WebEntity_Fixed {
  activityid: string;
}
interface ovs_cancellationrequest extends ovs_cancellationrequest_Base, ovs_cancellationrequest_Relationships {
}
interface ovs_cancellationrequest_Relationships {
}
interface ovs_cancellationrequest_Result extends ovs_cancellationrequest_Base, ovs_cancellationrequest_Relationships {
}
interface ovs_cancellationrequest_FormattedResult {
}
interface ovs_cancellationrequest_Select {
}
interface ovs_cancellationrequest_Expand {
}
interface ovs_cancellationrequest_Filter {
}
interface ovs_cancellationrequest_Create extends ovs_cancellationrequest {
}
interface ovs_cancellationrequest_Update extends ovs_cancellationrequest {
}
interface ovs_CYAction_Base extends WebEntity {
}
interface ovs_CYAction_Fixed extends WebEntity_Fixed {
  activityid: string;
}
interface ovs_CYAction extends ovs_CYAction_Base, ovs_CYAction_Relationships {
}
interface ovs_CYAction_Relationships {
}
interface ovs_CYAction_Result extends ovs_CYAction_Base, ovs_CYAction_Relationships {
}
interface ovs_CYAction_FormattedResult {
}
interface ovs_CYAction_Select {
}
interface ovs_CYAction_Expand {
}
interface ovs_CYAction_Filter {
}
interface ovs_CYAction_Create extends ovs_CYAction {
}
interface ovs_CYAction_Update extends ovs_CYAction {
}
interface ovs_CYSafetyAssessment_Base extends WebEntity {
}
interface ovs_CYSafetyAssessment_Fixed extends WebEntity_Fixed {
  ovs_cysafetyassessmentid: string;
}
interface ovs_CYSafetyAssessment extends ovs_CYSafetyAssessment_Base, ovs_CYSafetyAssessment_Relationships {
}
interface ovs_CYSafetyAssessment_Relationships {
}
interface ovs_CYSafetyAssessment_Result extends ovs_CYSafetyAssessment_Base, ovs_CYSafetyAssessment_Relationships {
}
interface ovs_CYSafetyAssessment_FormattedResult {
}
interface ovs_CYSafetyAssessment_Select {
}
interface ovs_CYSafetyAssessment_Expand {
}
interface ovs_CYSafetyAssessment_Filter {
}
interface ovs_CYSafetyAssessment_Create extends ovs_CYSafetyAssessment {
}
interface ovs_CYSafetyAssessment_Update extends ovs_CYSafetyAssessment {
}
interface ovs_ForecastQuarter_Base extends WebEntity {
}
interface ovs_ForecastQuarter_Fixed extends WebEntity_Fixed {
  ovs_forecastquarterid: string;
}
interface ovs_ForecastQuarter extends ovs_ForecastQuarter_Base, ovs_ForecastQuarter_Relationships {
}
interface ovs_ForecastQuarter_Relationships {
}
interface ovs_ForecastQuarter_Result extends ovs_ForecastQuarter_Base, ovs_ForecastQuarter_Relationships {
}
interface ovs_ForecastQuarter_FormattedResult {
}
interface ovs_ForecastQuarter_Select {
}
interface ovs_ForecastQuarter_Expand {
}
interface ovs_ForecastQuarter_Filter {
}
interface ovs_ForecastQuarter_Create extends ovs_ForecastQuarter {
}
interface ovs_ForecastQuarter_Update extends ovs_ForecastQuarter {
}
interface ovs_lob_Base extends WebEntity {
}
interface ovs_lob_Fixed extends WebEntity_Fixed {
  ovs_lobid: string;
}
interface ovs_lob extends ovs_lob_Base, ovs_lob_Relationships {
}
interface ovs_lob_Relationships {
}
interface ovs_lob_Result extends ovs_lob_Base, ovs_lob_Relationships {
}
interface ovs_lob_FormattedResult {
}
interface ovs_lob_Select {
}
interface ovs_lob_Expand {
}
interface ovs_lob_Filter {
}
interface ovs_lob_Create extends ovs_lob {
}
interface ovs_lob_Update extends ovs_lob {
}
interface ovs_operation_Base extends WebEntity {
}
interface ovs_operation_Fixed extends WebEntity_Fixed {
  ovs_operationid: string;
}
interface ovs_operation extends ovs_operation_Base, ovs_operation_Relationships {
}
interface ovs_operation_Relationships {
}
interface ovs_operation_Result extends ovs_operation_Base, ovs_operation_Relationships {
}
interface ovs_operation_FormattedResult {
}
interface ovs_operation_Select {
}
interface ovs_operation_Expand {
}
interface ovs_operation_Filter {
}
interface ovs_operation_Create extends ovs_operation {
}
interface ovs_operation_Update extends ovs_operation {
}
interface ovs_operationtype_Base extends WebEntity {
}
interface ovs_operationtype_Fixed extends WebEntity_Fixed {
  ovs_operationtypeid: string;
}
interface ovs_operationtype extends ovs_operationtype_Base, ovs_operationtype_Relationships {
}
interface ovs_operationtype_Relationships {
}
interface ovs_operationtype_Result extends ovs_operationtype_Base, ovs_operationtype_Relationships {
}
interface ovs_operationtype_FormattedResult {
}
interface ovs_operationtype_Select {
}
interface ovs_operationtype_Expand {
}
interface ovs_operationtype_Filter {
}
interface ovs_operationtype_Create extends ovs_operationtype {
}
interface ovs_operationtype_Update extends ovs_operationtype {
}
interface ovs_OversightType_Base extends WebEntity {
}
interface ovs_OversightType_Fixed extends WebEntity_Fixed {
  ovs_oversighttypeid: string;
}
interface ovs_OversightType extends ovs_OversightType_Base, ovs_OversightType_Relationships {
}
interface ovs_OversightType_Relationships {
}
interface ovs_OversightType_Result extends ovs_OversightType_Base, ovs_OversightType_Relationships {
}
interface ovs_OversightType_FormattedResult {
}
interface ovs_OversightType_Select {
}
interface ovs_OversightType_Expand {
}
interface ovs_OversightType_Filter {
}
interface ovs_OversightType_Create extends ovs_OversightType {
}
interface ovs_OversightType_Update extends ovs_OversightType {
}
interface ovs_Questionnaire_Base extends WebEntity {
}
interface ovs_Questionnaire_Fixed extends WebEntity_Fixed {
  ovs_questionnaireid: string;
}
interface ovs_Questionnaire extends ovs_Questionnaire_Base, ovs_Questionnaire_Relationships {
}
interface ovs_Questionnaire_Relationships {
}
interface ovs_Questionnaire_Result extends ovs_Questionnaire_Base, ovs_Questionnaire_Relationships {
}
interface ovs_Questionnaire_FormattedResult {
}
interface ovs_Questionnaire_Select {
}
interface ovs_Questionnaire_Expand {
}
interface ovs_Questionnaire_Filter {
}
interface ovs_Questionnaire_Create extends ovs_Questionnaire {
}
interface ovs_Questionnaire_Update extends ovs_Questionnaire {
}
interface ovs_revisedquarterrequest_Base extends WebEntity {
}
interface ovs_revisedquarterrequest_Fixed extends WebEntity_Fixed {
  activityid: string;
}
interface ovs_revisedquarterrequest extends ovs_revisedquarterrequest_Base, ovs_revisedquarterrequest_Relationships {
}
interface ovs_revisedquarterrequest_Relationships {
}
interface ovs_revisedquarterrequest_Result extends ovs_revisedquarterrequest_Base, ovs_revisedquarterrequest_Relationships {
}
interface ovs_revisedquarterrequest_FormattedResult {
}
interface ovs_revisedquarterrequest_Select {
}
interface ovs_revisedquarterrequest_Expand {
}
interface ovs_revisedquarterrequest_Filter {
}
interface ovs_revisedquarterrequest_Create extends ovs_revisedquarterrequest {
}
interface ovs_revisedquarterrequest_Update extends ovs_revisedquarterrequest {
}
interface ovs_SiteType_Base extends WebEntity {
}
interface ovs_SiteType_Fixed extends WebEntity_Fixed {
  ovs_sitetypeid: string;
}
interface ovs_SiteType extends ovs_SiteType_Base, ovs_SiteType_Relationships {
}
interface ovs_SiteType_Relationships {
}
interface ovs_SiteType_Result extends ovs_SiteType_Base, ovs_SiteType_Relationships {
}
interface ovs_SiteType_FormattedResult {
}
interface ovs_SiteType_Select {
}
interface ovs_SiteType_Expand {
}
interface ovs_SiteType_Filter {
}
interface ovs_SiteType_Create extends ovs_SiteType {
}
interface ovs_SiteType_Update extends ovs_SiteType {
}
interface ovs_TYRational_Base extends WebEntity {
}
interface ovs_TYRational_Fixed extends WebEntity_Fixed {
  ovs_tyrationalid: string;
}
interface ovs_TYRational extends ovs_TYRational_Base, ovs_TYRational_Relationships {
}
interface ovs_TYRational_Relationships {
}
interface ovs_TYRational_Result extends ovs_TYRational_Base, ovs_TYRational_Relationships {
}
interface ovs_TYRational_FormattedResult {
}
interface ovs_TYRational_Select {
}
interface ovs_TYRational_Expand {
}
interface ovs_TYRational_Filter {
}
interface ovs_TYRational_Create extends ovs_TYRational {
}
interface ovs_TYRational_Update extends ovs_TYRational {
}
interface ovs_UnplannedForecast_Base extends WebEntity {
}
interface ovs_UnplannedForecast_Fixed extends WebEntity_Fixed {
  ovs_unplannedforecastid: string;
}
interface ovs_UnplannedForecast extends ovs_UnplannedForecast_Base, ovs_UnplannedForecast_Relationships {
}
interface ovs_UnplannedForecast_Relationships {
}
interface ovs_UnplannedForecast_Result extends ovs_UnplannedForecast_Base, ovs_UnplannedForecast_Relationships {
}
interface ovs_UnplannedForecast_FormattedResult {
}
interface ovs_UnplannedForecast_Select {
}
interface ovs_UnplannedForecast_Expand {
}
interface ovs_UnplannedForecast_Filter {
}
interface ovs_UnplannedForecast_Create extends ovs_UnplannedForecast {
}
interface ovs_UnplannedForecast_Update extends ovs_UnplannedForecast {
}
interface qm_account_tylegislationcharacteristic_Base extends WebEntity {
}
interface qm_account_tylegislationcharacteristic_Fixed extends WebEntity_Fixed {
  qm_account_tylegislationcharacteristicid: string;
}
interface qm_account_tylegislationcharacteristic extends qm_account_tylegislationcharacteristic_Base, qm_account_tylegislationcharacteristic_Relationships {
}
interface qm_account_tylegislationcharacteristic_Relationships {
}
interface qm_account_tylegislationcharacteristic_Result extends qm_account_tylegislationcharacteristic_Base, qm_account_tylegislationcharacteristic_Relationships {
}
interface qm_account_tylegislationcharacteristic_FormattedResult {
}
interface qm_account_tylegislationcharacteristic_Select {
}
interface qm_account_tylegislationcharacteristic_Expand {
}
interface qm_account_tylegislationcharacteristic_Filter {
}
interface qm_account_tylegislationcharacteristic_Create extends qm_account_tylegislationcharacteristic {
}
interface qm_account_tylegislationcharacteristic_Update extends qm_account_tylegislationcharacteristic {
}
interface qm_rclegislation_Base extends WebEntity {
}
interface qm_rclegislation_Fixed extends WebEntity_Fixed {
  qm_rclegislationid: string;
}
interface qm_rclegislation extends qm_rclegislation_Base, qm_rclegislation_Relationships {
}
interface qm_rclegislation_Relationships {
}
interface qm_rclegislation_Result extends qm_rclegislation_Base, qm_rclegislation_Relationships {
}
interface qm_rclegislation_FormattedResult {
}
interface qm_rclegislation_Select {
}
interface qm_rclegislation_Expand {
}
interface qm_rclegislation_Filter {
}
interface qm_rclegislation_Create extends qm_rclegislation {
}
interface qm_rclegislation_Update extends qm_rclegislation {
}
interface qm_rclegislation_tylegislationcharacterist_Base extends WebEntity {
}
interface qm_rclegislation_tylegislationcharacterist_Fixed extends WebEntity_Fixed {
  qm_rclegislation_tylegislationcharacteristid: string;
}
interface qm_rclegislation_tylegislationcharacterist extends qm_rclegislation_tylegislationcharacterist_Base, qm_rclegislation_tylegislationcharacterist_Relationships {
}
interface qm_rclegislation_tylegislationcharacterist_Relationships {
}
interface qm_rclegislation_tylegislationcharacterist_Result extends qm_rclegislation_tylegislationcharacterist_Base, qm_rclegislation_tylegislationcharacterist_Relationships {
}
interface qm_rclegislation_tylegislationcharacterist_FormattedResult {
}
interface qm_rclegislation_tylegislationcharacterist_Select {
}
interface qm_rclegislation_tylegislationcharacterist_Expand {
}
interface qm_rclegislation_tylegislationcharacterist_Filter {
}
interface qm_rclegislation_tylegislationcharacterist_Create extends qm_rclegislation_tylegislationcharacterist {
}
interface qm_rclegislation_tylegislationcharacterist_Update extends qm_rclegislation_tylegislationcharacterist {
}
interface qm_sydependencygroup_Base extends WebEntity {
}
interface qm_sydependencygroup_Fixed extends WebEntity_Fixed {
  qm_sydependencygroupid: string;
}
interface qm_sydependencygroup extends qm_sydependencygroup_Base, qm_sydependencygroup_Relationships {
}
interface qm_sydependencygroup_Relationships {
}
interface qm_sydependencygroup_Result extends qm_sydependencygroup_Base, qm_sydependencygroup_Relationships {
}
interface qm_sydependencygroup_FormattedResult {
}
interface qm_sydependencygroup_Select {
}
interface qm_sydependencygroup_Expand {
}
interface qm_sydependencygroup_Filter {
}
interface qm_sydependencygroup_Create extends qm_sydependencygroup {
}
interface qm_sydependencygroup_Update extends qm_sydependencygroup {
}
interface qm_sydependencygroupitem_Base extends WebEntity {
}
interface qm_sydependencygroupitem_Fixed extends WebEntity_Fixed {
  qm_sydependencygroupitemid: string;
}
interface qm_sydependencygroupitem extends qm_sydependencygroupitem_Base, qm_sydependencygroupitem_Relationships {
}
interface qm_sydependencygroupitem_Relationships {
}
interface qm_sydependencygroupitem_Result extends qm_sydependencygroupitem_Base, qm_sydependencygroupitem_Relationships {
}
interface qm_sydependencygroupitem_FormattedResult {
}
interface qm_sydependencygroupitem_Select {
}
interface qm_sydependencygroupitem_Expand {
}
interface qm_sydependencygroupitem_Filter {
}
interface qm_sydependencygroupitem_Create extends qm_sydependencygroupitem {
}
interface qm_sydependencygroupitem_Update extends qm_sydependencygroupitem {
}
interface qm_sygroup_Base extends WebEntity {
}
interface qm_sygroup_Fixed extends WebEntity_Fixed {
  qm_sygroupid: string;
}
interface qm_sygroup extends qm_sygroup_Base, qm_sygroup_Relationships {
}
interface qm_sygroup_Relationships {
}
interface qm_sygroup_Result extends qm_sygroup_Base, qm_sygroup_Relationships {
}
interface qm_sygroup_FormattedResult {
}
interface qm_sygroup_Select {
}
interface qm_sygroup_Expand {
}
interface qm_sygroup_Filter {
}
interface qm_sygroup_Create extends qm_sygroup {
}
interface qm_sygroup_Update extends qm_sygroup {
}
interface qm_syquestion_Base extends WebEntity {
}
interface qm_syquestion_Fixed extends WebEntity_Fixed {
  qm_syquestionid: string;
}
interface qm_syquestion extends qm_syquestion_Base, qm_syquestion_Relationships {
}
interface qm_syquestion_Relationships {
}
interface qm_syquestion_Result extends qm_syquestion_Base, qm_syquestion_Relationships {
}
interface qm_syquestion_FormattedResult {
}
interface qm_syquestion_Select {
}
interface qm_syquestion_Expand {
}
interface qm_syquestion_Filter {
}
interface qm_syquestion_Create extends qm_syquestion {
}
interface qm_syquestion_Update extends qm_syquestion {
}
interface qm_syquestionvalidationrule_Base extends WebEntity {
}
interface qm_syquestionvalidationrule_Fixed extends WebEntity_Fixed {
  qm_syquestionvalidationruleid: string;
}
interface qm_syquestionvalidationrule extends qm_syquestionvalidationrule_Base, qm_syquestionvalidationrule_Relationships {
}
interface qm_syquestionvalidationrule_Relationships {
}
interface qm_syquestionvalidationrule_Result extends qm_syquestionvalidationrule_Base, qm_syquestionvalidationrule_Relationships {
}
interface qm_syquestionvalidationrule_FormattedResult {
}
interface qm_syquestionvalidationrule_Select {
}
interface qm_syquestionvalidationrule_Expand {
}
interface qm_syquestionvalidationrule_Filter {
}
interface qm_syquestionvalidationrule_Create extends qm_syquestionvalidationrule {
}
interface qm_syquestionvalidationrule_Update extends qm_syquestionvalidationrule {
}
interface qm_syresponse_Base extends WebEntity {
}
interface qm_syresponse_Fixed extends WebEntity_Fixed {
  qm_syresponseid: string;
}
interface qm_syresponse extends qm_syresponse_Base, qm_syresponse_Relationships {
}
interface qm_syresponse_Relationships {
}
interface qm_syresponse_Result extends qm_syresponse_Base, qm_syresponse_Relationships {
}
interface qm_syresponse_FormattedResult {
}
interface qm_syresponse_Select {
}
interface qm_syresponse_Expand {
}
interface qm_syresponse_Filter {
}
interface qm_syresponse_Create extends qm_syresponse {
}
interface qm_syresponse_Update extends qm_syresponse {
}
interface qm_syresponse_rclegislation_Base extends WebEntity {
}
interface qm_syresponse_rclegislation_Fixed extends WebEntity_Fixed {
  qm_syresponse_rclegislationid: string;
}
interface qm_syresponse_rclegislation extends qm_syresponse_rclegislation_Base, qm_syresponse_rclegislation_Relationships {
}
interface qm_syresponse_rclegislation_Relationships {
}
interface qm_syresponse_rclegislation_Result extends qm_syresponse_rclegislation_Base, qm_syresponse_rclegislation_Relationships {
}
interface qm_syresponse_rclegislation_FormattedResult {
}
interface qm_syresponse_rclegislation_Select {
}
interface qm_syresponse_rclegislation_Expand {
}
interface qm_syresponse_rclegislation_Filter {
}
interface qm_syresponse_rclegislation_Create extends qm_syresponse_rclegislation {
}
interface qm_syresponse_rclegislation_Update extends qm_syresponse_rclegislation {
}
interface qm_sytemplate_Base extends WebEntity {
}
interface qm_sytemplate_Fixed extends WebEntity_Fixed {
  qm_sytemplateid: string;
}
interface qm_sytemplate extends qm_sytemplate_Base, qm_sytemplate_Relationships {
}
interface qm_sytemplate_Relationships {
}
interface qm_sytemplate_Result extends qm_sytemplate_Base, qm_sytemplate_Relationships {
}
interface qm_sytemplate_FormattedResult {
}
interface qm_sytemplate_Select {
}
interface qm_sytemplate_Expand {
}
interface qm_sytemplate_Filter {
}
interface qm_sytemplate_Create extends qm_sytemplate {
}
interface qm_sytemplate_Update extends qm_sytemplate {
}
interface qm_sytemplate_sygroup_Base extends WebEntity {
}
interface qm_sytemplate_sygroup_Fixed extends WebEntity_Fixed {
  qm_sytemplate_sygroupid: string;
}
interface qm_sytemplate_sygroup extends qm_sytemplate_sygroup_Base, qm_sytemplate_sygroup_Relationships {
}
interface qm_sytemplate_sygroup_Relationships {
}
interface qm_sytemplate_sygroup_Result extends qm_sytemplate_sygroup_Base, qm_sytemplate_sygroup_Relationships {
}
interface qm_sytemplate_sygroup_FormattedResult {
}
interface qm_sytemplate_sygroup_Select {
}
interface qm_sytemplate_sygroup_Expand {
}
interface qm_sytemplate_sygroup_Filter {
}
interface qm_sytemplate_sygroup_Create extends qm_sytemplate_sygroup {
}
interface qm_sytemplate_sygroup_Update extends qm_sytemplate_sygroup {
}
interface qm_tylegislationcharacteristic_Base extends WebEntity {
}
interface qm_tylegislationcharacteristic_Fixed extends WebEntity_Fixed {
  qm_tylegislationcharacteristicid: string;
}
interface qm_tylegislationcharacteristic extends qm_tylegislationcharacteristic_Base, qm_tylegislationcharacteristic_Relationships {
}
interface qm_tylegislationcharacteristic_Relationships {
}
interface qm_tylegislationcharacteristic_Result extends qm_tylegislationcharacteristic_Base, qm_tylegislationcharacteristic_Relationships {
}
interface qm_tylegislationcharacteristic_FormattedResult {
}
interface qm_tylegislationcharacteristic_Select {
}
interface qm_tylegislationcharacteristic_Expand {
}
interface qm_tylegislationcharacteristic_Filter {
}
interface qm_tylegislationcharacteristic_Create extends qm_tylegislationcharacteristic {
}
interface qm_tylegislationcharacteristic_Update extends qm_tylegislationcharacteristic {
}
interface qm_tylegislationsource_Base extends WebEntity {
}
interface qm_tylegislationsource_Fixed extends WebEntity_Fixed {
  qm_tylegislationsourceid: string;
}
interface qm_tylegislationsource extends qm_tylegislationsource_Base, qm_tylegislationsource_Relationships {
}
interface qm_tylegislationsource_Relationships {
}
interface qm_tylegislationsource_Result extends qm_tylegislationsource_Base, qm_tylegislationsource_Relationships {
}
interface qm_tylegislationsource_FormattedResult {
}
interface qm_tylegislationsource_Select {
}
interface qm_tylegislationsource_Expand {
}
interface qm_tylegislationsource_Filter {
}
interface qm_tylegislationsource_Create extends qm_tylegislationsource {
}
interface qm_tylegislationsource_Update extends qm_tylegislationsource {
}
interface qm_tylegislationtype_Base extends WebEntity {
}
interface qm_tylegislationtype_Fixed extends WebEntity_Fixed {
  qm_tylegislationtypeid: string;
}
interface qm_tylegislationtype extends qm_tylegislationtype_Base, qm_tylegislationtype_Relationships {
}
interface qm_tylegislationtype_Relationships {
}
interface qm_tylegislationtype_Result extends qm_tylegislationtype_Base, qm_tylegislationtype_Relationships {
}
interface qm_tylegislationtype_FormattedResult {
}
interface qm_tylegislationtype_Select {
}
interface qm_tylegislationtype_Expand {
}
interface qm_tylegislationtype_Filter {
}
interface qm_tylegislationtype_Create extends qm_tylegislationtype {
}
interface qm_tylegislationtype_Update extends qm_tylegislationtype {
}
interface qm_TYValidationruletype_Base extends WebEntity {
}
interface qm_TYValidationruletype_Fixed extends WebEntity_Fixed {
  qm_tyvalidationruletypeid: string;
}
interface qm_TYValidationruletype extends qm_TYValidationruletype_Base, qm_TYValidationruletype_Relationships {
}
interface qm_TYValidationruletype_Relationships {
}
interface qm_TYValidationruletype_Result extends qm_TYValidationruletype_Base, qm_TYValidationruletype_Relationships {
}
interface qm_TYValidationruletype_FormattedResult {
}
interface qm_TYValidationruletype_Select {
}
interface qm_TYValidationruletype_Expand {
}
interface qm_TYValidationruletype_Filter {
}
interface qm_TYValidationruletype_Create extends qm_TYValidationruletype {
}
interface qm_TYValidationruletype_Update extends qm_TYValidationruletype {
}
interface tc_TCFiscalPeriod_Base extends WebEntity {
}
interface tc_TCFiscalPeriod_Fixed extends WebEntity_Fixed {
  tc_tcfiscalperiodid: string;
}
interface tc_TCFiscalPeriod extends tc_TCFiscalPeriod_Base, tc_TCFiscalPeriod_Relationships {
}
interface tc_TCFiscalPeriod_Relationships {
}
interface tc_TCFiscalPeriod_Result extends tc_TCFiscalPeriod_Base, tc_TCFiscalPeriod_Relationships {
}
interface tc_TCFiscalPeriod_FormattedResult {
}
interface tc_TCFiscalPeriod_Select {
}
interface tc_TCFiscalPeriod_Expand {
}
interface tc_TCFiscalPeriod_Filter {
}
interface tc_TCFiscalPeriod_Create extends tc_TCFiscalPeriod {
}
interface tc_TCFiscalPeriod_Update extends tc_TCFiscalPeriod {
}
interface tc_TCFiscalQuarter_Base extends WebEntity {
}
interface tc_TCFiscalQuarter_Fixed extends WebEntity_Fixed {
  tc_tcfiscalquarterid: string;
}
interface tc_TCFiscalQuarter extends tc_TCFiscalQuarter_Base, tc_TCFiscalQuarter_Relationships {
}
interface tc_TCFiscalQuarter_Relationships {
}
interface tc_TCFiscalQuarter_Result extends tc_TCFiscalQuarter_Base, tc_TCFiscalQuarter_Relationships {
}
interface tc_TCFiscalQuarter_FormattedResult {
}
interface tc_TCFiscalQuarter_Select {
}
interface tc_TCFiscalQuarter_Expand {
}
interface tc_TCFiscalQuarter_Filter {
}
interface tc_TCFiscalQuarter_Create extends tc_TCFiscalQuarter {
}
interface tc_TCFiscalQuarter_Update extends tc_TCFiscalQuarter {
}
interface tc_TCFiscalYear_Base extends WebEntity {
}
interface tc_TCFiscalYear_Fixed extends WebEntity_Fixed {
  tc_tcfiscalyearid: string;
}
interface tc_TCFiscalYear extends tc_TCFiscalYear_Base, tc_TCFiscalYear_Relationships {
}
interface tc_TCFiscalYear_Relationships {
}
interface tc_TCFiscalYear_Result extends tc_TCFiscalYear_Base, tc_TCFiscalYear_Relationships {
}
interface tc_TCFiscalYear_FormattedResult {
}
interface tc_TCFiscalYear_Select {
}
interface tc_TCFiscalYear_Expand {
}
interface tc_TCFiscalYear_Filter {
}
interface tc_TCFiscalYear_Create extends tc_TCFiscalYear {
}
interface tc_TCFiscalYear_Update extends tc_TCFiscalYear {
}
interface tc_TCMonth_Base extends WebEntity {
}
interface tc_TCMonth_Fixed extends WebEntity_Fixed {
  tc_tcmonthid: string;
}
interface tc_TCMonth extends tc_TCMonth_Base, tc_TCMonth_Relationships {
}
interface tc_TCMonth_Relationships {
}
interface tc_TCMonth_Result extends tc_TCMonth_Base, tc_TCMonth_Relationships {
}
interface tc_TCMonth_FormattedResult {
}
interface tc_TCMonth_Select {
}
interface tc_TCMonth_Expand {
}
interface tc_TCMonth_Filter {
}
interface tc_TCMonth_Create extends tc_TCMonth {
}
interface tc_TCMonth_Update extends tc_TCMonth {
}
interface Territory_Base extends WebEntity {
}
interface Territory_Fixed extends WebEntity_Fixed {
  territoryid: string;
}
interface Territory extends Territory_Base, Territory_Relationships {
}
interface Territory_Relationships {
}
interface Territory_Result extends Territory_Base, Territory_Relationships {
}
interface Territory_FormattedResult {
}
interface Territory_Select {
}
interface Territory_Expand {
}
interface Territory_Filter {
}
interface Territory_Create extends Territory {
}
interface Territory_Update extends Territory {
}
interface BulkOperationLog_Base extends WebEntity {
}
interface BulkOperationLog_Fixed extends WebEntity_Fixed {
  bulkoperationlogid: string;
}
interface BulkOperationLog extends BulkOperationLog_Base, BulkOperationLog_Relationships {
}
interface BulkOperationLog_Relationships {
}
interface BulkOperationLog_Result extends BulkOperationLog_Base, BulkOperationLog_Relationships {
}
interface BulkOperationLog_FormattedResult {
}
interface BulkOperationLog_Select {
}
interface BulkOperationLog_Expand {
}
interface BulkOperationLog_Filter {
}
interface BulkOperationLog_Create extends BulkOperationLog {
}
interface BulkOperationLog_Update extends BulkOperationLog {
}
interface Connection_Base extends WebEntity {
}
interface Connection_Fixed extends WebEntity_Fixed {
  connectionid: string;
}
interface Connection extends Connection_Base, Connection_Relationships {
}
interface Connection_Relationships {
}
interface Connection_Result extends Connection_Base, Connection_Relationships {
}
interface Connection_FormattedResult {
}
interface Connection_Select {
}
interface Connection_Expand {
}
interface Connection_Filter {
}
interface Connection_Create extends Connection {
}
interface Connection_Update extends Connection {
}
interface Team_Base extends WebEntity {
}
interface Team_Fixed extends WebEntity_Fixed {
  teamid: string;
}
interface Team extends Team_Base, Team_Relationships {
}
interface Team_Relationships {
}
interface Team_Result extends Team_Base, Team_Relationships {
}
interface Team_FormattedResult {
}
interface Team_Select {
}
interface Team_Expand {
}
interface Team_Filter {
}
interface Team_Create extends Team {
}
interface Team_Update extends Team {
}
interface ServiceAppointment_Base extends WebEntity {
}
interface ServiceAppointment_Fixed extends WebEntity_Fixed {
  activityid: string;
}
interface ServiceAppointment extends ServiceAppointment_Base, ServiceAppointment_Relationships {
}
interface ServiceAppointment_Relationships {
}
interface ServiceAppointment_Result extends ServiceAppointment_Base, ServiceAppointment_Relationships {
}
interface ServiceAppointment_FormattedResult {
}
interface ServiceAppointment_Select {
}
interface ServiceAppointment_Expand {
}
interface ServiceAppointment_Filter {
}
interface ServiceAppointment_Create extends ServiceAppointment {
}
interface ServiceAppointment_Update extends ServiceAppointment {
}
interface PostFollow_Base extends WebEntity {
}
interface PostFollow_Fixed extends WebEntity_Fixed {
  postfollowid: string;
}
interface PostFollow extends PostFollow_Base, PostFollow_Relationships {
}
interface PostFollow_Relationships {
}
interface PostFollow_Result extends PostFollow_Base, PostFollow_Relationships {
}
interface PostFollow_FormattedResult {
}
interface PostFollow_Select {
}
interface PostFollow_Expand {
}
interface PostFollow_Filter {
}
interface PostFollow_Create extends PostFollow {
}
interface PostFollow_Update extends PostFollow {
}
interface IncidentResolution_Base extends WebEntity {
}
interface IncidentResolution_Fixed extends WebEntity_Fixed {
  activityid: string;
}
interface IncidentResolution extends IncidentResolution_Base, IncidentResolution_Relationships {
}
interface IncidentResolution_Relationships {
}
interface IncidentResolution_Result extends IncidentResolution_Base, IncidentResolution_Relationships {
}
interface IncidentResolution_FormattedResult {
}
interface IncidentResolution_Select {
}
interface IncidentResolution_Expand {
}
interface IncidentResolution_Filter {
}
interface IncidentResolution_Create extends IncidentResolution {
}
interface IncidentResolution_Update extends IncidentResolution {
}
interface Appointment_Base extends WebEntity {
}
interface Appointment_Fixed extends WebEntity_Fixed {
  activityid: string;
}
interface Appointment extends Appointment_Base, Appointment_Relationships {
}
interface Appointment_Relationships {
}
interface Appointment_Result extends Appointment_Base, Appointment_Relationships {
}
interface Appointment_FormattedResult {
}
interface Appointment_Select {
}
interface Appointment_Expand {
}
interface Appointment_Filter {
}
interface Appointment_Create extends Appointment {
}
interface Appointment_Update extends Appointment {
}
interface BookableResourceCategoryAssn_Base extends WebEntity {
}
interface BookableResourceCategoryAssn_Fixed extends WebEntity_Fixed {
  bookableresourcecategoryassnid: string;
}
interface BookableResourceCategoryAssn extends BookableResourceCategoryAssn_Base, BookableResourceCategoryAssn_Relationships {
}
interface BookableResourceCategoryAssn_Relationships {
}
interface BookableResourceCategoryAssn_Result extends BookableResourceCategoryAssn_Base, BookableResourceCategoryAssn_Relationships {
}
interface BookableResourceCategoryAssn_FormattedResult {
}
interface BookableResourceCategoryAssn_Select {
}
interface BookableResourceCategoryAssn_Expand {
}
interface BookableResourceCategoryAssn_Filter {
}
interface BookableResourceCategoryAssn_Create extends BookableResourceCategoryAssn {
}
interface BookableResourceCategoryAssn_Update extends BookableResourceCategoryAssn {
}
interface BookingStatus_Base extends WebEntity {
}
interface BookingStatus_Fixed extends WebEntity_Fixed {
  bookingstatusid: string;
}
interface BookingStatus extends BookingStatus_Base, BookingStatus_Relationships {
}
interface BookingStatus_Relationships {
}
interface BookingStatus_Result extends BookingStatus_Base, BookingStatus_Relationships {
}
interface BookingStatus_FormattedResult {
}
interface BookingStatus_Select {
}
interface BookingStatus_Expand {
}
interface BookingStatus_Filter {
}
interface BookingStatus_Create extends BookingStatus {
}
interface BookingStatus_Update extends BookingStatus {
}
interface SystemUser_Base extends WebEntity {
}
interface SystemUser_Fixed extends WebEntity_Fixed {
  systemuserid: string;
}
interface SystemUser extends SystemUser_Base, SystemUser_Relationships {
}
interface SystemUser_Relationships {
}
interface SystemUser_Result extends SystemUser_Base, SystemUser_Relationships {
}
interface SystemUser_FormattedResult {
}
interface SystemUser_Select {
}
interface SystemUser_Expand {
}
interface SystemUser_Filter {
}
interface SystemUser_Create extends SystemUser {
}
interface SystemUser_Update extends SystemUser {
}
