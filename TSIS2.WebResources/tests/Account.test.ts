import MainForm from "../src/Account/MainForm";
import { XrmMockGenerator } from "xrm-mock";

describe("Account", () => {
  beforeEach(() => {
    XrmMockGenerator.initialise();
    XrmMockGenerator.Attribute.createString("address1_country", "USA");
    XrmMockGenerator.Attribute.createString(
      {
        name: "address1_composite_compositionLinkControl_address1_country"
      },
      // Mock an single control component. Can also be an array of control components.
      {
        label: "Country",
        visible: true,
        name: "address1_composite_compositionLinkControl_address1_country"
      }
    );
  });

  it("should initially have address 1 country hidden", () => {
    const formContext = XrmMockGenerator.eventContext.getFormContext() as Form.account.Main.ROMInformation;
    MainForm.onLoad(XrmMockGenerator.eventContext);
    const countryControl = formContext.getControl("address1_composite_compositionLinkControl_address1_country");
    expect(countryControl?.getVisible()).toBe(false);
  });

  it("should have ts_country copied to address1 country on ts_country change", () => {
    const formContext = XrmMockGenerator.eventContext.getFormContext() as Form.account.Main.ROMInformation;
    // Setup tc_country field which would trigger on change 
    const tsCountryAttribute = XrmMockGenerator.Attribute.createLookup("ts_country", {
      entityType: "tc_country",
      id: "{00000000-0000-0000-0000-000000000001}",
      name: "Canada",
    });
    XrmMockGenerator.Attribute.createString("msdyn_serviceterritory", "Ontario");
    MainForm.countryOnChange(XrmMockGenerator.eventContext);
    const countryAttributeValue = formContext.getAttribute("address1_country")?.getValue();
    expect(countryAttributeValue).toBe(tsCountryAttribute.getValue()[0].name);
  });
});