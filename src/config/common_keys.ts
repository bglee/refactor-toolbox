import { KnownKeys } from "./known_keys";


export const isDefaultVisible = (key: string): boolean => isCommonKey(key);


export const isCommonKey = (key: string): boolean => {
    return commonKeys.includes(key as KnownKeys);
}

export const commonKeys: KnownKeys[] = [
    "alternate",   // For else branches
    "arguments",   // For function call arguments
    "body",        // The main content/statements of a function, loop, or program
    "callee",      // The function being invoked in a call expression
    "consequent",  // For if/conditional statements
    "declarations",// For variable declarations
    "expression",  // Any node that represents a value or can be evaluated
    "id",          // The identifier node (name) of a declaration
    "init",        // For variable declarations
    "left",        // For binary expressions/assignments
    "name",        // The string name of an identifier
    "operator",    // For understanding operations
    "params",      // For function parameters
    "right",       // For binary expressions/assignments
    "test",        // For conditional statements
    "type",        // The type of AST node (e.g., 'FunctionDeclaration', 'BinaryExpression')
    "value"        // The actual value of a literal or property
];



