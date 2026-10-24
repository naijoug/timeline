/** Safe JSON in a non-executable script element, without HTML-attribute expansion.
 * Escape '<' so content can never terminate the script tag. */
export function payloadJson(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}
