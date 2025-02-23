
## How to run

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Abstract Syntax Tree (AST) Resources


## What is an AST?
An Abstract Syntax Tree (AST) is a tree representation of the abstract syntactic structure of source code. It's a crucial data structure used in compilers and code analysis tools that:

- Represents program structure while omitting unnecessary syntax details (like parentheses and semicolons)
- Preserves the essential structure and content of the code
- Serves as an intermediate representation during compilation
- Enables code analysis, transformation, and generation

Key properties that make ASTs useful:
- Can be enhanced with additional information and annotations
- Excludes unnecessary punctuation and delimiters
- Contains metadata about code elements (like source positions)
- Preserves program structure in a format suitable for analysis

## Common Use Cases
- Compiler design and implementation
- Code analysis and transformation
- Program verification
- Code generation
- AST differencing (comparing code changes)
- Clone detection (finding duplicate code)

## Useful AST Tools
- [ESTree Spec](https://github.com/estree/estree) - The standard specification for JavaScript ASTs
- [TypeScript AST Viewer](https://ts-ast-viewer.com/) - Interactive tool for exploring TypeScript ASTs
- [AST Explorer](https://astexplorer.net/) - Web tool to explore ASTs in multiple languages

## Language-Specific AST Definitions

### JavaScript/TypeScript
- [ESTree Spec](https://github.com/estree/estree) - The standard for JS/TS ASTs
- [TypeScript Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API) - Official TypeScript AST docs
- [Babel Parser (formerly Babylon)](https://github.com/babel/babel/tree/main/packages/babel-parser) - Detailed AST spec

### Python
- [Green Tree Snakes](https://greentreesnakes.readthedocs.io/en/latest/) - Python AST reference
- [Python AST Module Documentation](https://docs.python.org/3/library/ast.html) - Official Python docs
- [Python AST Explorer](https://python-ast-explorer.com/) - Interactive AST explorer

### Java
- [Eclipse JDT AST](https://help.eclipse.org/latest/topic/org.eclipse.jdt.doc.isv/reference/api/org/eclipse/jdt/core/dom/AST.html) - Eclipse's Java AST spec
- [JavaParser AST Documentation](https://javaparser.org/documentation.html) - Comprehensive Java AST docs

### Ruby
- [RubyParser AST Node Types](https://github.com/seattlerb/ruby_parser/blob/master/lib/ruby_parser_extras.rb) - Ruby AST definitions
- [Parser Gem Documentation](https://whitequark.github.io/parser/) - Detailed Ruby parser docs

### C/C++
- [Clang AST](https://clang.llvm.org/docs/IntroductionToTheClangAST.html) - Official Clang AST documentation
- [GCC AST Documentation](https://gcc.gnu.org/onlinedocs/gccint/Tree-overview.html) - GCC internal AST docs

### Go
- [Go Parser Package](https://pkg.go.dev/go/parser) - Official Go parser documentation
- [Go AST Package](https://pkg.go.dev/go/ast) - Official Go AST package docs

### Rust
- [Rust AST Reference](https://doc.rust-lang.org/nightly/nightly-rustc/rustc_ast/) - Official Rust AST docs
- [Syn Parser Documentation](https://docs.rs/syn/) - Popular Rust parser library

### PHP
- [PHP Parser Documentation](https://github.com/nikic/PHP-Parser/tree/master/doc) - Comprehensive PHP AST docs
- [PHP AST Extension](https://github.com/nikic/php-ast) - Native PHP AST extension

### General Resources
- [Tree-sitter](https://tree-sitter.github.io/tree-sitter/) - Parser generator tool with AST definitions for many languages
- [ANTLR](https://www.antlr.org/) - Parser generator with grammar definitions for multiple languages
- [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) - Includes AST-related specifications