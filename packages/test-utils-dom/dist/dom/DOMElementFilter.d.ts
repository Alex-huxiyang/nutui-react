/**
 * Source: https://github.com/facebook/jest/blob/e7bb6a1e26ffab90611b2593912df15b69315611/packages/pretty-format/src/plugins/DOMElement.ts
 */
import type { NewPlugin } from 'pretty-format';
export declare const test: NewPlugin['test'];
export default function createDOMElementFilter({ filterNode, filterPrint, changeOpenTag, }: {
    filterNode?: (node: Node) => boolean;
    filterPrint?: (node: Node) => boolean;
    changeOpenTag?: (type: string) => string;
}): NewPlugin;
