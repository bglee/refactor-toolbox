# AST Test File Generator

This script generates test files with configurable statement length and depth for testing AST parsers.

## Features

- **Multiple Languages**: Supports JavaScript, TypeScript, and Go
- **Configurable Complexity**: Adjustable statement count and nesting depth
- **Realistic Code**: Generates various AST node types including:
  - Variable declarations
  - Function definitions
  - Control flow statements (if/else, loops, switch)
  - Classes and interfaces
  - TypeScript-specific features (types, interfaces, generics)
  - Go-specific constructs (goroutines, defer, panic/recover)

## Usage

### Basic Usage

```bash
# Generate test files with default settings (100 statements, depth 5)
npm run generate-tests

# Or run directly
node scripts/generate-test-files.js
```

### Advanced Usage

```bash
# Generate 1000 statements with depth 10
node scripts/generate-test-files.js --length 1000 --depth 10

# Generate only JavaScript and TypeScript files
node scripts/generate-test-files.js --languages js,ts --length 500

# Specify custom output directory
node scripts/generate-test-files.js --output ./my-tests --length 200 --depth 3
```

### Command Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--length` | `-l` | Number of statements to generate | 100 |
| `--depth` | `-d` | Maximum nesting depth | 5 |
| `--languages` | `-lang` | Comma-separated list of languages (js,ts,go) | js,ts,go |
| `--output` | `-o` | Output directory | `generated-tests/` |
| `--help` | `-h` | Show help message | - |

## Generated Files

The script creates files in the following format:
- `test-{length}statements-{depth}depth.js` - JavaScript file

## Statement Types Generated

### JavaScript
- **Simple**: Variable declarations, console.log, return statements
- **Medium**: If/else, loops, functions, objects, arrays
- **Complex**: Classes, interfaces, async/await, generators, decorators


## Example Output

```javascript
// Generated test file for AST parser
// Statement length: 100
// Statement depth: 5

const var1 = 42;
let var2 = "hello world";
function func3() { 
  if (condition4) { 
    const var5 = true; 
  } 
}
class Class6 { 
  constructor() { 
    this.prop = "value"; 
  } 
}
// ... more statements
```

## Performance Testing

Use this script to generate large files for performance testing:

```bash
# Generate a very large file for stress testing
node scripts/generate-test-files.js --length 10000 --depth 15 --languages js

# Generate multiple large files for comparison
node scripts/generate-test-files.js --length 5000 --depth 10 --languages js,ts,go
```

## Integration with AST Parser

The generated files can be used to test your AST parser's performance and correctness:

```javascript
const { TestFileGenerator } = require('./scripts/generate-test-files.js');
const { JavaScript } = require('./src/parsers/javaScript');

// Generate test content
const generator = new TestFileGenerator(1000, 10);
const testCode = generator.generateJavaScriptFile();

// Test parser performance
const jsParser = new JavaScript();
const startTime = Date.now();
const ast = jsParser.parse(testCode, 'recast');
const endTime = Date.now();

console.log(`Parsed ${testCode.split('\n').length} lines in ${endTime - startTime}ms`);
``` 