import { LightningElement, api } from "lwc";
import { version } from "graphql";

export default class Balloon extends LightningElement {
    connectedCallback() {
        console.log(`using graphql version ${version}`);
    }

    @api
    public testProp: any;
}
