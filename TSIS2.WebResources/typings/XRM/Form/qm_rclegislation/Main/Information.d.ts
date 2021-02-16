declare namespace Form.qm_rclegislation.Main {
  namespace Information {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "null_section_3"): Xrm.PageSection;
        get(name: "null_section_4"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "createdby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "createdon"): Xrm.DateAttribute;
      get(name: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "modifiedon"): Xrm.DateAttribute;
      get(name: "qm_historicalnoteetxt"): Xrm.Attribute<string>;
      get(name: "qm_inforcedte"): Xrm.DateAttribute;
      get(name: "qm_justiceid"): Xrm.NumberAttribute;
      get(name: "qm_lastamendeddte"): Xrm.DateAttribute;
      get(name: "qm_legislationetxt"): Xrm.Attribute<string>;
      get(name: "qm_legislationftxt"): Xrm.Attribute<string>;
      get(name: "qm_legislationlbl"): Xrm.Attribute<string>;
      get(name: "qm_name"): Xrm.Attribute<string>;
      get(name: "qm_ordernbr"): Xrm.NumberAttribute;
      get(name: "qm_rcparentlegislationid"): Xrm.LookupAttribute<"qm_rclegislation">;
      get(name: "qm_tylegislationsourceid"): Xrm.LookupAttribute<"qm_tylegislationsource">;
      get(name: "qm_tylegislationtypeid"): Xrm.LookupAttribute<"qm_tylegislationtype">;
      get(name: "statecode"): Xrm.OptionSetAttribute<qm_rclegislation_statecode>;
      get(name: "statuscode"): Xrm.OptionSetAttribute<qm_rclegislation_statuscode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Characteristics"): Xrm.SubGridControl<"qm_tylegislationcharacteristic">;
      get(name: "Subgrid_1"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "createdby"): Xrm.LookupControl<"systemuser">;
      get(name: "createdon"): Xrm.DateControl;
      get(name: "modifiedby"): Xrm.LookupControl<"systemuser">;
      get(name: "modifiedon"): Xrm.DateControl;
      get(name: "qm_historicalnoteetxt"): Xrm.StringControl;
      get(name: "qm_inforcedte"): Xrm.DateControl;
      get(name: "qm_justiceid"): Xrm.NumberControl;
      get(name: "qm_lastamendeddte"): Xrm.DateControl;
      get(name: "qm_legislationetxt"): Xrm.StringControl;
      get(name: "qm_legislationftxt"): Xrm.StringControl;
      get(name: "qm_legislationlbl"): Xrm.StringControl;
      get(name: "qm_name"): Xrm.StringControl;
      get(name: "qm_ordernbr"): Xrm.NumberControl;
      get(name: "qm_rcparentlegislationid"): Xrm.LookupControl<"qm_rclegislation">;
      get(name: "qm_tylegislationsourceid"): Xrm.LookupControl<"qm_tylegislationsource">;
      get(name: "qm_tylegislationtypeid"): Xrm.LookupControl<"qm_tylegislationtype">;
      get(name: "statecode"): Xrm.OptionSetControl<qm_rclegislation_statecode>;
      get(name: "statuscode"): Xrm.OptionSetControl<qm_rclegislation_statuscode>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_1"): Xrm.PageTab<Tabs.tab_1>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "createdby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "modifiedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "qm_historicalnoteetxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_inforcedte"): Xrm.DateAttribute;
    getAttribute(attributeName: "qm_justiceid"): Xrm.NumberAttribute;
    getAttribute(attributeName: "qm_lastamendeddte"): Xrm.DateAttribute;
    getAttribute(attributeName: "qm_legislationetxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_legislationftxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_legislationlbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_ordernbr"): Xrm.NumberAttribute;
    getAttribute(attributeName: "qm_rcparentlegislationid"): Xrm.LookupAttribute<"qm_rclegislation">;
    getAttribute(attributeName: "qm_tylegislationsourceid"): Xrm.LookupAttribute<"qm_tylegislationsource">;
    getAttribute(attributeName: "qm_tylegislationtypeid"): Xrm.LookupAttribute<"qm_tylegislationtype">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<qm_rclegislation_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<qm_rclegislation_statuscode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Characteristics"): Xrm.SubGridControl<"qm_tylegislationcharacteristic">;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "createdby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "createdon"): Xrm.DateControl;
    getControl(controlName: "modifiedby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "modifiedon"): Xrm.DateControl;
    getControl(controlName: "qm_historicalnoteetxt"): Xrm.StringControl;
    getControl(controlName: "qm_inforcedte"): Xrm.DateControl;
    getControl(controlName: "qm_justiceid"): Xrm.NumberControl;
    getControl(controlName: "qm_lastamendeddte"): Xrm.DateControl;
    getControl(controlName: "qm_legislationetxt"): Xrm.StringControl;
    getControl(controlName: "qm_legislationftxt"): Xrm.StringControl;
    getControl(controlName: "qm_legislationlbl"): Xrm.StringControl;
    getControl(controlName: "qm_name"): Xrm.StringControl;
    getControl(controlName: "qm_ordernbr"): Xrm.NumberControl;
    getControl(controlName: "qm_rcparentlegislationid"): Xrm.LookupControl<"qm_rclegislation">;
    getControl(controlName: "qm_tylegislationsourceid"): Xrm.LookupControl<"qm_tylegislationsource">;
    getControl(controlName: "qm_tylegislationtypeid"): Xrm.LookupControl<"qm_tylegislationtype">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<qm_rclegislation_statecode>;
    getControl(controlName: "statuscode"): Xrm.OptionSetControl<qm_rclegislation_statuscode>;
    getControl(controlName: string): undefined;
  }
}
