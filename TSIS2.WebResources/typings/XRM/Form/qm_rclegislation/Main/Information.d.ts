declare namespace Form.qm_rclegislation.Main {
  namespace Information {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "null_section_4"): Xrm.PageSection;
        get(name: "tab_1_section_4"): Xrm.PageSection;
        get(name: "{e2fb0e3f-7448-4531-a803-767a37ce03b0}"): Xrm.PageSection;
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
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_6 extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_1"): Xrm.PageSection;
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
      get(name: "qm_additionalmetadataetxt"): Xrm.Attribute<string>;
      get(name: "qm_additionalmetadataftxt"): Xrm.Attribute<string>;
      get(name: "qm_enablingprovision"): Xrm.LookupAttribute<"qm_rclegislation">;
      get(name: "qm_historicalnoteetxt"): Xrm.Attribute<string>;
      get(name: "qm_historicalnoteftxt"): Xrm.Attribute<string>;
      get(name: "qm_inforcedte"): Xrm.DateAttribute;
      get(name: "qm_justicefid"): Xrm.NumberAttribute;
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
      get(name: "qm_violationdisplaytexten"): Xrm.Attribute<string>;
      get(name: "qm_violationdisplaytextfr"): Xrm.Attribute<string>;
      get(name: "statecode"): Xrm.OptionSetAttribute<qm_rclegislation_statecode>;
      get(name: "statuscode"): Xrm.OptionSetAttribute<qm_rclegislation_statuscode>;
      get(name: "ts_classification"): Xrm.OptionSetAttribute<ts_classification>;
      get(name: "ts_nameenglish"): Xrm.Attribute<string>;
      get(name: "ts_namefrench"): Xrm.Attribute<string>;
      get(name: "ts_provisioncategory"): Xrm.LookupAttribute<"ts_provisioncategory">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_1"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "Subgrid_2"): Xrm.SubGridControl<"qm_tylegislationcharacteristic">;
      get(name: "Subgrid_new_3"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "causes_sub_grid"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "createdby"): Xrm.LookupControl<"systemuser">;
      get(name: "createdon"): Xrm.DateControl;
      get(name: "modifiedby"): Xrm.LookupControl<"systemuser">;
      get(name: "modifiedon"): Xrm.DateControl;
      get(name: "qm_additionalmetadataetxt"): Xrm.StringControl;
      get(name: "qm_additionalmetadataftxt"): Xrm.StringControl;
      get(name: "qm_enablingprovision"): Xrm.LookupControl<"qm_rclegislation">;
      get(name: "qm_historicalnoteetxt"): Xrm.StringControl;
      get(name: "qm_historicalnoteftxt"): Xrm.StringControl;
      get(name: "qm_inforcedte"): Xrm.DateControl;
      get(name: "qm_justicefid"): Xrm.NumberControl;
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
      get(name: "qm_violationdisplaytexten"): Xrm.StringControl;
      get(name: "qm_violationdisplaytextfr"): Xrm.StringControl;
      get(name: "references_sub_grid"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "statecode"): Xrm.OptionSetControl<qm_rclegislation_statecode>;
      get(name: "statuscode"): Xrm.OptionSetControl<qm_rclegislation_statuscode>;
      get(name: "ts_classification"): Xrm.OptionSetControl<ts_classification>;
      get(name: "ts_nameenglish"): Xrm.StringControl;
      get(name: "ts_namefrench"): Xrm.StringControl;
      get(name: "ts_provisioncategory"): Xrm.LookupControl<"ts_provisioncategory">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_1"): Xrm.PageTab<Tabs.tab_1>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: "tab_6"): Xrm.PageTab<Tabs.tab_6>;
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
    getAttribute(attributeName: "qm_additionalmetadataetxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_additionalmetadataftxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_enablingprovision"): Xrm.LookupAttribute<"qm_rclegislation">;
    getAttribute(attributeName: "qm_historicalnoteetxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_historicalnoteftxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_inforcedte"): Xrm.DateAttribute;
    getAttribute(attributeName: "qm_justicefid"): Xrm.NumberAttribute;
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
    getAttribute(attributeName: "qm_violationdisplaytexten"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_violationdisplaytextfr"): Xrm.Attribute<string>;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<qm_rclegislation_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<qm_rclegislation_statuscode>;
    getAttribute(attributeName: "ts_classification"): Xrm.OptionSetAttribute<ts_classification>;
    getAttribute(attributeName: "ts_nameenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_namefrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_provisioncategory"): Xrm.LookupAttribute<"ts_provisioncategory">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "Subgrid_2"): Xrm.SubGridControl<"qm_tylegislationcharacteristic">;
    getControl(controlName: "Subgrid_new_3"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "causes_sub_grid"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "createdby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "createdon"): Xrm.DateControl;
    getControl(controlName: "modifiedby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "modifiedon"): Xrm.DateControl;
    getControl(controlName: "qm_additionalmetadataetxt"): Xrm.StringControl;
    getControl(controlName: "qm_additionalmetadataftxt"): Xrm.StringControl;
    getControl(controlName: "qm_enablingprovision"): Xrm.LookupControl<"qm_rclegislation">;
    getControl(controlName: "qm_historicalnoteetxt"): Xrm.StringControl;
    getControl(controlName: "qm_historicalnoteftxt"): Xrm.StringControl;
    getControl(controlName: "qm_inforcedte"): Xrm.DateControl;
    getControl(controlName: "qm_justicefid"): Xrm.NumberControl;
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
    getControl(controlName: "qm_violationdisplaytexten"): Xrm.StringControl;
    getControl(controlName: "qm_violationdisplaytextfr"): Xrm.StringControl;
    getControl(controlName: "references_sub_grid"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<qm_rclegislation_statecode>;
    getControl(controlName: "statuscode"): Xrm.OptionSetControl<qm_rclegislation_statuscode>;
    getControl(controlName: "ts_classification"): Xrm.OptionSetControl<ts_classification>;
    getControl(controlName: "ts_nameenglish"): Xrm.StringControl;
    getControl(controlName: "ts_namefrench"): Xrm.StringControl;
    getControl(controlName: "ts_provisioncategory"): Xrm.LookupControl<"ts_provisioncategory">;
    getControl(controlName: string): undefined;
  }
}
