// @ts-ignore - buildCustomElementConstructor has no exported type because
// it will be removed once this is in https://github.com/salesforce/lwc/pull/1395
import { buildCustomElementConstructor } from "lwc";
import About from "./modules/template/about/about";

customElements.define("lwc-app", buildCustomElementConstructor(About));
const element = document.createElement("lwc-app");
document.body.appendChild(element);
