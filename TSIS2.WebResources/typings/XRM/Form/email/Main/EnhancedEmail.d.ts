declare namespace Form.email.Main {
  namespace EnhancedEmail {
    namespace Tabs {
      interface Email extends Xrm.SectionCollectionBase {
        get(name: "Regarding information"): Xrm.PageSection;
        get(name: "recipient information"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Email_Engagement extends Xrm.SectionCollectionBase {
        get(name: "Emailrecipient_section_6"): Xrm.PageSection;
        get(name: "emailengagementactions"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "bcc"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "cc"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "description"): Xrm.Attribute<any>;
      get(name: "from"): Xrm.LookupAttribute<"queue" | "systemuser">;
      get(name: "isemailfollowed"): Xrm.OptionSetAttribute<boolean>;
      get(name: "isemailreminderset"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_sentiment"): Xrm.Attribute<any>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "prioritycode"): Xrm.OptionSetAttribute<email_prioritycode>;
      get(name: "regardingobjectid"): Xrm.LookupAttribute<"account" | "adx_invitation" | "asyncoperation" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_functionallocation" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "mspp_adplacement" | "mspp_pollplacement" | "mspp_publishingstatetransitionrule" | "mspp_redirect" | "mspp_shortcut" | "mspp_website" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_case" | "ts_request" | "ts_securityincident" | "ts_site" | "ts_teamplanningdata">;
      get(name: "scheduledend"): Xrm.DateAttribute;
      get(name: "statuscode"): Xrm.OptionSetAttribute<email_statuscode>;
      get(name: "subject"): Xrm.Attribute<string>;
      get(name: "to"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "attachmentsGrid"): Xrm.BaseControl;
      get(name: "bcc"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "cc"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "description"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "emailengagementactionscontrol"): Xrm.BaseControl;
      get(name: "emailrecipientactivitycontrol"): Xrm.BaseControl;
      get(name: "footer_emailfollowed"): Xrm.OptionSetControl<boolean>;
      get(name: "footer_emailremainderset"): Xrm.OptionSetControl<boolean>;
      get(name: "from"): Xrm.LookupControl<"queue" | "systemuser">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_prioritycode"): Xrm.OptionSetControl<email_prioritycode>;
      get(name: "header_scheduledend"): Xrm.DateControl;
      get(name: "header_statecode"): Xrm.OptionSetControl<email_statuscode>;
      get(name: "msdyn_sentiment"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "regardingobjectid"): Xrm.LookupControl<"account" | "adx_invitation" | "asyncoperation" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_functionallocation" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "mspp_adplacement" | "mspp_pollplacement" | "mspp_publishingstatetransitionrule" | "mspp_redirect" | "mspp_shortcut" | "mspp_website" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_case" | "ts_request" | "ts_securityincident" | "ts_site" | "ts_teamplanningdata">;
      get(name: "subject"): Xrm.StringControl;
      get(name: "to"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "Email"): Xrm.PageTab<Tabs.Email>;
      get(name: "Email_Engagement"): Xrm.PageTab<Tabs.Email_Engagement>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface EnhancedEmail extends Xrm.PageBase<EnhancedEmail.Attributes,EnhancedEmail.Tabs,EnhancedEmail.Controls> {
    getAttribute(attributeName: "bcc"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getAttribute(attributeName: "cc"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getAttribute(attributeName: "description"): Xrm.Attribute<any>;
    getAttribute(attributeName: "from"): Xrm.LookupAttribute<"queue" | "systemuser">;
    getAttribute(attributeName: "isemailfollowed"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "isemailreminderset"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_sentiment"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "prioritycode"): Xrm.OptionSetAttribute<email_prioritycode>;
    getAttribute(attributeName: "regardingobjectid"): Xrm.LookupAttribute<"account" | "adx_invitation" | "asyncoperation" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_functionallocation" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "mspp_adplacement" | "mspp_pollplacement" | "mspp_publishingstatetransitionrule" | "mspp_redirect" | "mspp_shortcut" | "mspp_website" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_case" | "ts_request" | "ts_securityincident" | "ts_site" | "ts_teamplanningdata">;
    getAttribute(attributeName: "scheduledend"): Xrm.DateAttribute;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<email_statuscode>;
    getAttribute(attributeName: "subject"): Xrm.Attribute<string>;
    getAttribute(attributeName: "to"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "attachmentsGrid"): Xrm.BaseControl;
    getControl(controlName: "bcc"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getControl(controlName: "cc"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getControl(controlName: "description"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "emailengagementactionscontrol"): Xrm.BaseControl;
    getControl(controlName: "emailrecipientactivitycontrol"): Xrm.BaseControl;
    getControl(controlName: "footer_emailfollowed"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "footer_emailremainderset"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "from"): Xrm.LookupControl<"queue" | "systemuser">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_prioritycode"): Xrm.OptionSetControl<email_prioritycode>;
    getControl(controlName: "header_scheduledend"): Xrm.DateControl;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<email_statuscode>;
    getControl(controlName: "msdyn_sentiment"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "regardingobjectid"): Xrm.LookupControl<"account" | "adx_invitation" | "asyncoperation" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_functionallocation" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "mspp_adplacement" | "mspp_pollplacement" | "mspp_publishingstatetransitionrule" | "mspp_redirect" | "mspp_shortcut" | "mspp_website" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_case" | "ts_request" | "ts_securityincident" | "ts_site" | "ts_teamplanningdata">;
    getControl(controlName: "subject"): Xrm.StringControl;
    getControl(controlName: "to"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getControl(controlName: string): undefined;
  }
}
