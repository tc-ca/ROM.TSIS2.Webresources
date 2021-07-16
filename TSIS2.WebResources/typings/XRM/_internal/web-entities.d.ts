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
interface msdyn_customerasset_Base extends WebEntity {
}
interface msdyn_customerasset_Fixed extends WebEntity_Fixed {
  msdyn_customerassetid: string;
}
interface msdyn_customerasset extends msdyn_customerasset_Base, msdyn_customerasset_Relationships {
}
interface msdyn_customerasset_Relationships {
}
interface msdyn_customerasset_Result extends msdyn_customerasset_Base, msdyn_customerasset_Relationships {
}
interface msdyn_customerasset_FormattedResult {
}
interface msdyn_customerasset_Select {
}
interface msdyn_customerasset_Expand {
}
interface msdyn_customerasset_Filter {
}
interface msdyn_customerasset_Create extends msdyn_customerasset {
}
interface msdyn_customerasset_Update extends msdyn_customerasset {
}
interface msdyn_FunctionalLocation_Base extends WebEntity {
}
interface msdyn_FunctionalLocation_Fixed extends WebEntity_Fixed {
  msdyn_functionallocationid: string;
}
interface msdyn_FunctionalLocation extends msdyn_FunctionalLocation_Base, msdyn_FunctionalLocation_Relationships {
}
interface msdyn_FunctionalLocation_Relationships {
}
interface msdyn_FunctionalLocation_Result extends msdyn_FunctionalLocation_Base, msdyn_FunctionalLocation_Relationships {
}
interface msdyn_FunctionalLocation_FormattedResult {
}
interface msdyn_FunctionalLocation_Select {
}
interface msdyn_FunctionalLocation_Expand {
}
interface msdyn_FunctionalLocation_Filter {
}
interface msdyn_FunctionalLocation_Create extends msdyn_FunctionalLocation {
}
interface msdyn_FunctionalLocation_Update extends msdyn_FunctionalLocation {
}
interface msdyn_incident_msdyn_customerasset_Base extends WebEntity {
}
interface msdyn_incident_msdyn_customerasset_Fixed extends WebEntity_Fixed {
  msdyn_incident_msdyn_customerassetid: string;
}
interface msdyn_incident_msdyn_customerasset extends msdyn_incident_msdyn_customerasset_Base, msdyn_incident_msdyn_customerasset_Relationships {
}
interface msdyn_incident_msdyn_customerasset_Relationships {
}
interface msdyn_incident_msdyn_customerasset_Result extends msdyn_incident_msdyn_customerasset_Base, msdyn_incident_msdyn_customerasset_Relationships {
}
interface msdyn_incident_msdyn_customerasset_FormattedResult {
}
interface msdyn_incident_msdyn_customerasset_Select {
}
interface msdyn_incident_msdyn_customerasset_Expand {
}
interface msdyn_incident_msdyn_customerasset_Filter {
}
interface msdyn_incident_msdyn_customerasset_Create extends msdyn_incident_msdyn_customerasset {
}
interface msdyn_incident_msdyn_customerasset_Update extends msdyn_incident_msdyn_customerasset {
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
interface msdyn_msdyn_functionallocation_account_Base extends WebEntity {
}
interface msdyn_msdyn_functionallocation_account_Fixed extends WebEntity_Fixed {
  msdyn_msdyn_functionallocation_accountid: string;
}
interface msdyn_msdyn_functionallocation_account extends msdyn_msdyn_functionallocation_account_Base, msdyn_msdyn_functionallocation_account_Relationships {
}
interface msdyn_msdyn_functionallocation_account_Relationships {
}
interface msdyn_msdyn_functionallocation_account_Result extends msdyn_msdyn_functionallocation_account_Base, msdyn_msdyn_functionallocation_account_Relationships {
}
interface msdyn_msdyn_functionallocation_account_FormattedResult {
}
interface msdyn_msdyn_functionallocation_account_Select {
}
interface msdyn_msdyn_functionallocation_account_Expand {
}
interface msdyn_msdyn_functionallocation_account_Filter {
}
interface msdyn_msdyn_functionallocation_account_Create extends msdyn_msdyn_functionallocation_account {
}
interface msdyn_msdyn_functionallocation_account_Update extends msdyn_msdyn_functionallocation_account {
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
interface ts_msdyn_customerasset_msdyn_customerasset_Base extends WebEntity {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Fixed extends WebEntity_Fixed {
  ts_msdyn_customerasset_msdyn_customerassetid: string;
}
interface ts_msdyn_customerasset_msdyn_customerasset extends ts_msdyn_customerasset_msdyn_customerasset_Base, ts_msdyn_customerasset_msdyn_customerasset_Relationships {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Relationships {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Result extends ts_msdyn_customerasset_msdyn_customerasset_Base, ts_msdyn_customerasset_msdyn_customerasset_Relationships {
}
interface ts_msdyn_customerasset_msdyn_customerasset_FormattedResult {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Select {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Expand {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Filter {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Create extends ts_msdyn_customerasset_msdyn_customerasset {
}
interface ts_msdyn_customerasset_msdyn_customerasset_Update extends ts_msdyn_customerasset_msdyn_customerasset {
}
interface ts_msdyn_customerasset_msdyn_workorder_Base extends WebEntity {
}
interface ts_msdyn_customerasset_msdyn_workorder_Fixed extends WebEntity_Fixed {
  ts_msdyn_customerasset_msdyn_workorderid: string;
}
interface ts_msdyn_customerasset_msdyn_workorder extends ts_msdyn_customerasset_msdyn_workorder_Base, ts_msdyn_customerasset_msdyn_workorder_Relationships {
}
interface ts_msdyn_customerasset_msdyn_workorder_Relationships {
}
interface ts_msdyn_customerasset_msdyn_workorder_Result extends ts_msdyn_customerasset_msdyn_workorder_Base, ts_msdyn_customerasset_msdyn_workorder_Relationships {
}
interface ts_msdyn_customerasset_msdyn_workorder_FormattedResult {
}
interface ts_msdyn_customerasset_msdyn_workorder_Select {
}
interface ts_msdyn_customerasset_msdyn_workorder_Expand {
}
interface ts_msdyn_customerasset_msdyn_workorder_Filter {
}
interface ts_msdyn_customerasset_msdyn_workorder_Create extends ts_msdyn_customerasset_msdyn_workorder {
}
interface ts_msdyn_customerasset_msdyn_workorder_Update extends ts_msdyn_customerasset_msdyn_workorder {
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
interface msdyn_customerassetcategory_Base extends WebEntity {
}
interface msdyn_customerassetcategory_Fixed extends WebEntity_Fixed {
  msdyn_customerassetcategoryid: string;
}
interface msdyn_customerassetcategory extends msdyn_customerassetcategory_Base, msdyn_customerassetcategory_Relationships {
}
interface msdyn_customerassetcategory_Relationships {
}
interface msdyn_customerassetcategory_Result extends msdyn_customerassetcategory_Base, msdyn_customerassetcategory_Relationships {
}
interface msdyn_customerassetcategory_FormattedResult {
}
interface msdyn_customerassetcategory_Select {
}
interface msdyn_customerassetcategory_Expand {
}
interface msdyn_customerassetcategory_Filter {
}
interface msdyn_customerassetcategory_Create extends msdyn_customerassetcategory {
}
interface msdyn_customerassetcategory_Update extends msdyn_customerassetcategory {
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
