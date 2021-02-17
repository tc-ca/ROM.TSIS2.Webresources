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
