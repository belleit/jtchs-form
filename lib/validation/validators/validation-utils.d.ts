/**
 * ReDoS-safe validation utilities
 * These functions avoid using Zod to keep the surveys package lightweight
 */
/**
 * Validate email address using a ReDoS-safe regex
 * Matches Zod's/HTML5's permissive behavior while avoiding nested quantifiers
 */
export declare const validateEmail: (email: string) => boolean;
/**
 * Validate URL using the URL constructor
 */
export declare const validateUrl: (url: string) => boolean;
/**
 * Validate phone number using a ReDoS-safe regex
 * Matches the pattern: must start with digit or +, end with digit
 */
export declare const validatePhone: (phone: string) => boolean;
//# sourceMappingURL=validation-utils.d.ts.map