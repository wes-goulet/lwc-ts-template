// @ts-ignore
import { buildCustomElementConstructor } from "lwc";
// @ts-ignore
import App from "template/app";

customElements.define("lwc-app", buildCustomElementConstructor(App));
const element = document.createElement("lwc-app");
document.body.appendChild(element);
