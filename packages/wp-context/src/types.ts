/**
 * wp-context-build is setup to pull values from different sources within a
 * webpage such as http parameters, headers, cookies, etc. This interface
 * defines the source of a context (value) and the name within that source.
 * Example: { type: 'param', name: 'utm_medium'} tells wp-context-build to
 * pull the value from a Url Parameter named 'utm_medium'.
 */
export interface WpContextSource {
  type: 'param' | 'header' | 'cookie' | 'local_storage' | 'url' | 'referrer' | 'uuid' | 'location'
  name: string
}

export interface WpHtmlElement {

  /**
   * The expected type of html element we are searching for on the webpage (
   * such as input, form, id, etc.). The type needs to match the value returned
   * from form.nodeName.
   */
  elementType: string

  /**
   * Defines the attribute used to search for the html element. If no option
   * is provided, then an attempt to get the element is done by first accessing
   * the `id` attribute and then the `name` attribute.
   *
   * Warning! Only one matching html element should be found. If more than
   * one element is found, an error is thrown.
   *
   * Any custom attribute name, such as data-*, can be used to try and find
   * the html element. See the `id` and `name` values below.
   *
   * id: (safest). Uses the `id` attribute of the html element
   *   (document.getElementById).
   * Safest since the id property in html is unique assuring only one element
   * returns.
   * name: Uses the `name` attribute of the html element
   *   (document.getElementsByName).
   * id_or_name (TODO): Tries to find the element using the id and then the name.
   * class: Uses the `class` attribute of the html element
   *   (document.getElementsByClassName)
   */
  attributeName: string

  /**
   * The expected matching value of the attribute.
   */
  attributeValue: string
}

export interface WpFormFieldDestination {
  /**
   * The location within the json blob whose value will be written to the
   * form field. For example 'utm.medium' would result in the value being
   * pulled from { utm: { medium: 'some value' }}.
   */
  pullFrom: string

  /**
   * Information about the element we are mapping to.
   */
  destination: WpHtmlElement

}

export interface WpFormDestination {

  /** Information about the form */
  form: WpHtmlElement

  /** One or more form inputs data will write to. */
  formInput: WpFormFieldDestination | WpFormFieldDestination[]

}

export type WpDestination = WpFormDestination | WpFormFieldDestination;

export type WpDestinations = WpDestination[];

/**
 * The intent of the wp-context library is to pull values from different
 * locations in a webpage and place them in a json blob for easier access.
 * The Webpage Context interface defines the location/locations of a given
 * context within a webpage such as URL parameter, header, cookie,
 * local-storage and places that value in a json object we are building.
 */
export type WpContextConfig = {

  /** Defines if a given context configuration must return a value (true by
   * default). When true, an error is shown on the console if no value was
   * found. When false, an error is not shown and the value is not required.
   * required is ignored if a default value is provided (see default below)
   * TODO: Provide a callback so a developer can handle the error.
   */

  required?: boolean

  /**
   * The location within the json blob being built where, if the a value is
   * found for the context, that value will be placed. For example 'utm.medium'
   * would result in the value being places in { utm: { medium: 'some value' }}.
   */
  mapTo: string

  /** The, optional, default value is used if no value for a given context is
   * found on the webpage. When a default value is provided, the required
   * option is ignored.
   */
  default?: string | number | unknown[]

  /**
   * An object of OR an array of one or more context sources. The order of the
   *  sources as defined in the json determines the order that wp-context
   * attempts to find a value within the webpage.
   */
  source: WpContextSource | WpContextSource[]

}

/**
 * Defines one or more Webpage context configs.
 */
export type WpContextConfigs = WpContextConfig[];

export const WP_CONTEXT_SESSION_KEY = '7f6b9c4c-4430-45b4-8696-be90fa8e147e';