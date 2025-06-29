export const knownKeys = [
  "alternate",
  // The alternate branch of a conditional expression or if statement
  // Example: In `if (test) { consequent } else { alternate }`, represents the else block

  "argument",
  // A single argument in a unary expression or other node that takes one argument
  // Example: In `typeof x`, 'x' is the argument

  "arguments",
  // Array of arguments passed to a function call
  // Example: In `foo(a, b, c)`, [a, b, c] are the arguments

  "async",
  // Boolean flag indicating if a function is asynchronous
  // Example: In `async function foo() {}`, async is true

  "block",
  // A block statement containing multiple statements within curly braces
  // Example: The `{ ... }` in if statements, functions, etc.

  "body",
  // The main content/statements of a function, loop, or program
  // Example: Everything between { } in a function declaration

  "cachedSourceMap",
  // Internal cache for source maps to improve performance

  "cachedTabWidth",
  // Internal cache for tab width calculations in formatting

  "callee",
  // The function being invoked in a call expression
  // Example: In `foo()`, 'foo' is the callee

  "column",
  // The column number in source code for source mapping
  // Used for error reporting and debugging

  "comments",
  // Array of comment nodes (both single and multi-line)
  // Includes both inline and block comments in the code

  "computed",
  // Boolean indicating if a property access is computed (brackets) or static (dot)
  // Example: obj[prop] is computed, obj.prop is not

  "consequent",
  // The "then" branch of an if statement or conditional expression
  // Example: In `if (test) { consequent }`, the code block after if

  "declarations",
  // List of declarators in a variable declaration
  // Example: In `let a = 1, b = 2`, contains both 'a' and 'b' declarations

  "directive",
  // Special string directives in a program
  // Example: "use strict" directive

  "elements",
  // Array of elements in an array expression
  // Example: In `[1, 2, 3]`, elements are [1, 2, 3]

  "end",
  // The ending character index of a node in the source code
  // Used for source mapping and range information

  "errors",
  // Collection of syntax or parsing errors encountered

  "expression",
  // Any node that represents a value or can be evaluated
  // Examples: literals, operations, function calls

  "finalizer",
  // The finally block in a try-catch-finally statement
  // Example: try {} catch {} finally { finalizer }

  "generator",
  // Boolean indicating if a function is a generator function
  // Example: function* gen() {}

  "handler",
  // The catch clause in a try-catch statement
  // Example: try {} catch(handler) {}

  "id",
  // The identifier node (name) of a declaration
  // Example: In `function foo()`, 'foo' is the id

  "indent",
  // The indentation level or string used for formatting

  "infos",
  // Additional metadata or information about a node

  "init",
  // The initializer expression in a variable declaration
  // Example: In `let x = 5`, '5' is the init

  "key",
  // The key/name in an object property or method
  // Example: In `{foo: 42}`, 'foo' is the key

  "kind",
  // The kind of declaration (var, let, const) or method (get, set)
  // Example: The 'const' in `const x = 5`

  "leading",
  // Comments that appear before a node

  "left",
  // Left-hand side of a binary expression or assignment
  // Example: In `a + b`, 'a' is the left

  "length",
  // Length property, often used in arrays and other collections

  "lines",
  // Source code lines, used for formatting and source mapping

  "loc",
  // Location information including start and end positions
  // Contains line and column information

  "locked",
  // Internal state flag for preventing recursive operations

  "mappings",
  // Source map mappings between original and generated code

  "method",
  // Boolean indicating if a property is a method
  // Example: In `{foo() {}}`, method is true for foo

  "name",
  // The string name of an identifier
  // Example: Variable names, function names, etc.

  "object",
  // The object in a member expression
  // Example: In `foo.bar`, 'foo' is the object

  "operator",
  // The operator in an expression
  // Example: '+', '-', '*', '/' in arithmetic expressions

  "param",
  // A single parameter in a function declaration

  "params",
  // Array of parameters in a function declaration
  // Example: In `function(a, b, c)`, params are [a, b, c]

  "prefix",
  // Boolean indicating if an operator is prefix or postfix
  // Example: ++x (prefix) vs x++ (postfix)

  "properties",
  // Array of properties in an object expression
  // Example: All key-value pairs in an object literal

  "property",
  // The property being accessed in a member expression
  // Example: In `foo.bar`, 'bar' is the property

  "raw",
  // The raw source code string for a node
  // Preserves original formatting and quotes

  "right",
  // Right-hand side of a binary expression or assignment
  // Example: In `a + b`, 'b' is the right

  "shorthand",
  // Boolean indicating if an object property uses shorthand notation
  // Example: `{x}` vs `{x: x}`

  "sliceEnd",
  // End index for source code slicing operations

  "sliceStart",
  // Start index for source code slicing operations

  "sourceType",
  // Type of source code: 'module' or 'script'
  // Affects how imports/exports are handled

  "start",
  // The starting character index of a node in the source code
  // Used for source mapping and range information

  "test",
  // The condition expression in control flow statements
  // Example: The condition in if/while/for statements

  "token",
  // A single token from the lexical analysis

  "tokens",
  // Array of all tokens from lexical analysis

  "trailing",
  // Comments that appear after a node

  "type",
  // The type of AST node (e.g., 'Identifier', 'BinaryExpression')
  // Core property used to identify node kinds
  // Common types include:
  // 1. 'FunctionDeclaration' - Example: function foo() {}
  // 2. 'VariableDeclaration' - Example: let x = 42;
  // 3. 'BinaryExpression' - Example: a + b
  // 4. 'CallExpression' - Example: foo()
  // 5. 'MemberExpression' - Example: obj.property
  // This property is essential for AST traversal and transformation

  "update",
  // The update expression in a for loop
  // Example: In `for(;; i++)`, 'i++' is the update

  "value",
  // The actual value of a literal or property
  // Example: The '42' in `{foo: 42}`
] as const;

export type KnownKeys = (typeof knownKeys)[number];
