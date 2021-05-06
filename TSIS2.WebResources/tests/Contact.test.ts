import Contact from "../src/ts/Contact";
import { XrmMockGenerator } from "xrm-mock";

describe("Contact", () => {
    beforeEach(() => {
        XrmMockGenerator.initialise();
        XrmMockGenerator.Attribute.createString("firstname", "Joe");
    });

    it("should initially be called Joe", () => {
        const form = <Form.contact.Main.Information>XrmMockGenerator.eventContext.getFormContext();
        let name = form.getAttribute("firstname").getValue();
        expect(name).toBe("Joe"); // Pass
    });

    it("should change name to Bob onLoad", () => {
        const form = <Form.contact.Main.Information>XrmMockGenerator.eventContext.getFormContext();
        Contact.onLoad(XrmMockGenerator.eventContext);
        let name = form.getAttribute("firstname").getValue();
        expect(name).toBe("Bob"); // Pass
    });
});