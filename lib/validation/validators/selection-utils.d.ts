/**
 * Count the number of actual selections in a multi-select value array.
 *
 * The value array format for MultiSelect:
 * - Regular options: ["Label1", "Label2"]
 * - With "other" option: ["Label1", "", "custom other text"]
 *   - The "" sentinel indicates "other" is selected
 *   - The text following it is the custom value
 *
 * This function counts logical selections, not array length.
 */
export declare const countSelections: (value: unknown[]) => number;
//# sourceMappingURL=selection-utils.d.ts.map