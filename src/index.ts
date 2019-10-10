import { buildCustomElementConstructor } from "@lwc/engine";
import App from "./template/app/app";

customElements.define("lwc-app", buildCustomElementConstructor(App));
const element = document.createElement("lwc-app");
document.body.appendChild(element);
