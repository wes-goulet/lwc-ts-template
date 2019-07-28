// this file redeclares the LWC module, the current @lwc/engine type declaration
// file in node_modules has TSC violations. These violations are fixed in this
// file... if the API of @lwc/engine changes then this file will need updating,
// but the real fix is to fix the LWC source code and ditch the path redirect
// to this fine lin tsconfig.
declare module "lwc" {
    interface ComposableEvent extends Event {
        composed: boolean;
    }

    class HTMLElementTheGoodPart {
        dispatchEvent(evt: ComposableEvent): boolean;
        addEventListener(
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
        ): void;
        removeEventListener(
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | EventListenerOptions
        ): void;
        setAttributeNS(ns: string, attrName: string, value: any): any; // MODIFIED
        removeAttributeNS(ns: string, attrName: string): any; // MODIFIED
        removeAttribute(attrName: string): any; // MODIFIED
        setAttribute(attrName: string, value: any): any; // MODIFIED
        getAttribute(attrName: string): string | null;
        getAttributeNS(ns: string, attrName: string): any; // MODIFIED
        getBoundingClientRect(): ClientRect;
        querySelector<E extends Element = Element>(selectors: string): E | null;
        querySelectorAll<E extends Element = Element>(
            selectors: string
        ): NodeListOf<E>;
        getElementsByTagName(
            tagNameOrWildCard: string
        ): HTMLCollectionOf<Element>;
        getElementsByClassName(names: string): HTMLCollectionOf<Element>;
        readonly tagName: string;
        readonly classList: DOMTokenList;

        // Default HTML Properties
        dir: string;
        id: string;
        accessKey: string;
        title: string;
        lang: string;
        hidden: boolean;
        draggable: boolean;
        tabIndex: number;

        // Aria Properties
        ariaAutoComplete: string | null;
        ariaChecked: string | null;
        ariaCurrent: string | null;
        ariaDisabled: string | null;
        ariaExpanded: string | null;
        ariaHasPopup: string | null;
        ariaHidden: string | null;
        ariaInvalid: string | null;
        ariaLabel: string | null;
        ariaLevel: string | null;
        ariaMultiLine: string | null;
        ariaMultiSelectable: string | null;
        ariaOrientation: string | null;
        ariaPressed: string | null;
        ariaReadOnly: string | null;
        ariaRequired: string | null;
        ariaSelected: string | null;
        ariaSort: string | null;
        ariaValueMax: string | null;
        ariaValueMin: string | null;
        ariaValueNow: string | null;
        ariaValueText: string | null;
        ariaLive: string | null;
        ariaRelevant: string | null;
        ariaAtomic: string | null;
        ariaBusy: string | null;
        ariaActiveDescendant: string | null;
        ariaControls: string | null;
        ariaDescribedBy: string | null;
        ariaFlowTo: string | null;
        ariaLabelledBy: string | null;
        ariaOwns: string | null;
        ariaPosInSet: string | null;
        ariaSetSize: string | null;
        ariaColCount: string | null;
        ariaColIndex: string | null;
        ariaDetails: string | null;
        ariaErrorMessage: string | null;
        ariaKeyShortcuts: string | null;
        ariaModal: string | null;
        ariaPlaceholder: string | null;
        ariaRoleDescription: string | null;
        ariaRowCount: string | null;
        ariaRowIndex: string | null;
        ariaRowSpan: string | null;
        ariaColSpan: string | null;
        role: string | null;
    }

    // MODIFIED
    interface ShadowRootTheGoodPart {
        mode: string;
        readonly activeElement: Element | null;
        readonly host: HTMLElement;
        readonly firstChild: Node | null;
        readonly lastChild: Node | null;
        readonly innerHTML: string;
        readonly textContent: string;
        readonly childNodes: Node[];
        readonly delegatesFocus: boolean;
        addEventListener(
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | AddEventListenerOptions
        ): void;
        removeEventListener(
            type: string,
            listener: EventListenerOrEventListenerObject,
            options?: boolean | EventListenerOptions
        ): void;
        hasChildNodes(): boolean;
        compareDocumentPosition(otherNode: Node): number;
        contains(otherNode: Node): boolean;
        elementFromPoint(x: number, y: number): Element | null;
    }

    /**
     * Base class for the Lightning Web Component JavaScript class
     */
    export class LightningElement extends HTMLElementTheGoodPart {
        /**
         * Called when the component is created
         */
        constructor();
        /**
         * Called when the element is inserted in a document
         */
        connectedCallback(): void;
        /**
         * Called when the element is removed from a document
         */
        disconnectedCallback(): void;
        /**
         * Called after every render of the component
         */
        renderedCallback(): void;
        /**
         * Called when a descendant component throws an error in one of its lifecycle hooks
         */
        errorCallback(error: Error, stack: string): void;

        readonly template: ShadowRootTheGoodPart;
        readonly shadowRoot: null;
    }

    /**
     * Decorator to mark public reactive properties
     */
    export const api: PropertyDecorator;

    /**
     * Decorator to mark private reactive properties
     */
    export const track: PropertyDecorator;

    /**
     * Decorator factory to wire a property or method to a wire adapter data source
     * @param getType imperative accessor for the data source
     * @param config configuration object for the accessor
     */
    export function wire(
        getType: (config?: any) => any,
        config?: any
    ): PropertyDecorator;

    // MODIFIED
    export function buildCustomElementConstructor(
        element: LightningElement
    ): any;
}
