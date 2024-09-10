declare namespace Form.ts_trip.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_actualcost"): Xrm.NumberAttribute;
      get(name: "ts_costexplanation"): Xrm.Attribute<string>;
      get(name: "ts_estimatedcost"): Xrm.NumberAttribute;
      get(name: "ts_estimatedduration"): Xrm.NumberAttribute;
      get(name: "ts_estimatedtraveltime"): Xrm.NumberAttribute;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_id"): Xrm.Attribute<string>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_plannedcost"): Xrm.NumberAttribute;
      get(name: "ts_plannedfiscalquarter"): Xrm.LookupAttribute<"tc_tcfiscalquarter">;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_traveltime"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Inspections"): Xrm.SubGridControl<"ts_tripinspection">;
      get(name: "Inspectors"): Xrm.SubGridControl<"ts_tripinspector">;
      get(name: "modifiedby"): Xrm.LookupControl<"systemuser">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_actualcost"): Xrm.NumberControl;
      get(name: "ts_costexplanation"): Xrm.StringControl;
      get(name: "ts_estimatedcost"): Xrm.NumberControl;
      get(name: "ts_estimatedduration"): Xrm.NumberControl;
      get(name: "ts_estimatedtraveltime"): Xrm.NumberControl;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_id"): Xrm.StringControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_plannedcost"): Xrm.NumberControl;
      get(name: "ts_plannedfiscalquarter"): Xrm.LookupControl<"tc_tcfiscalquarter">;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_traveltime"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_actualcost"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_costexplanation"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_estimatedcost"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_estimatedtraveltime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_id"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_plannedcost"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedfiscalquarter"): Xrm.LookupAttribute<"tc_tcfiscalquarter">;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_traveltime"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Inspections"): Xrm.SubGridControl<"ts_tripinspection">;
    getControl(controlName: "Inspectors"): Xrm.SubGridControl<"ts_tripinspector">;
    getControl(controlName: "modifiedby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_actualcost"): Xrm.NumberControl;
    getControl(controlName: "ts_costexplanation"): Xrm.StringControl;
    getControl(controlName: "ts_estimatedcost"): Xrm.NumberControl;
    getControl(controlName: "ts_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "ts_estimatedtraveltime"): Xrm.NumberControl;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_id"): Xrm.StringControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_plannedcost"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedfiscalquarter"): Xrm.LookupControl<"tc_tcfiscalquarter">;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_traveltime"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
