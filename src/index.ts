// @ts-ignore - buildCustomElementConstructor has no exported type because
// it will be removed once this is in https://github.com/salesforce/lwc/pull/1395
import { buildCustomElementConstructor } from "lwc";
import App from "./modules/template/app/app";

customElements.define("lwc-app", buildCustomElementConstructor(App));
const element = document.createElement("lwc-app");
document.body.appendChild(element);
