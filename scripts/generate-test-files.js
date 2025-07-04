#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const DEFAULT_STATEMENT_LENGTH = 100;
const DEFAULT_STATEMENT_DEPTH = 5;
const OUTPUT_DIR = path.join(__dirname, '..', 'generated-tests');

// Statement templates for different complexity levels (JavaScript only)
const STATEMENT_TEMPLATES = {
  simple: [
    'const var${i} = ${value};',
    'let var${i} = ${value};',
    'var var${i} = ${value};',
    'console.log(${value});',
    'return ${value};',
    'throw new Error("Error ${i}");',
  ],
  medium: [
    'if (condition${i}) { ${nested} }',
    'if (condition${i}) { ${nested} } else { ${nested} }',
    'for (let i = 0; i < ${value}; i++) { ${nested} }',
    'while (condition${i}) { ${nested} }',
    'do { ${nested} } while (condition${i});',
    'switch (value${i}) { case 1: ${nested}; break; default: ${nested}; }',
    'try { ${nested} } catch (error) { ${nested} }',
    'function func${i}() { ${nested} }',
    'const func${i} = () => { ${nested} };',
    'const obj${i} = { prop: ${value}, method: () => { ${nested} } };',
    'const arr${i} = [${value}, ${value}, ${value}];',
    'const result${i} = condition${i} ? ${value} : ${value};',
  ],
  complex: [
    'class Class${i} { constructor() { ${nested} } method() { ${nested} } }',
    'const asyncFunc${i} = async () => { ${nested} };',
    'const generator${i} = function*() { yield ${value}; ${nested} };',
  ]
};

const VALUES = [
  '42',
  '"hello world"',
  'true',
  'false',
  'null',
  'undefined',
  '[1, 2, 3]',
  '{ prop: "value" }',
  '() => {}',
  'Math.random()',
  'Date.now()',
  'Symbol("symbol")',
  'BigInt(123)',
  'new Map()',
  'new Set()',
  'Promise.resolve()',
  'new Error("test")',
  'new Array(10)',
  'new Object()',
  'new Function()'
];

const CONDITIONS = [
  'true',
  'false',
  'i < 10',
  'i > 0',
  'condition === true',
  'value !== null',
  'array.length > 0',
  'object.hasOwnProperty("prop")',
  'typeof value === "string"',
  'Array.isArray(value)',
  'value instanceof Error',
  'Math.random() > 0.5',
  'Date.now() % 2 === 0',
  'Boolean(value)',
  '!!value'
];

class TestFileGenerator {
  constructor(statementLength = DEFAULT_STATEMENT_LENGTH, statementDepth = DEFAULT_STATEMENT_DEPTH) {
    this.statementLength = statementLength;
    this.statementDepth = statementDepth;
    this.counter = 0;
    this.usedNames = new Set();
  }

  getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  getRandomValue() {
    return this.getRandomItem(VALUES);
  }

  getRandomCondition() {
    return this.getRandomItem(CONDITIONS);
  }

  generateUniqueName(base) {
    let name = base;
    let counter = 1;
    while (this.usedNames.has(name)) {
      name = `${base}${counter}`;
      counter++;
    }
    this.usedNames.add(name);
    return name;
  }

  generateStatementWithScope(depth = 1, templates = STATEMENT_TEMPLATES, scopeId = '') {
    this.counter++;
    const currentScope = scopeId || `scope${this.counter}`;
    
    if (depth >= this.statementDepth) {
      const template = this.getRandomItem(templates.simple);
      return template
        .replace(/\${i}/g, this.generateUniqueName(`${currentScope}_var${this.counter}`))
        .replace(/\${value}/g, this.getRandomValue());
    }

    let availableTemplates;
    if (depth <= 2) {
      availableTemplates = [...templates.simple, ...templates.medium];
    } else {
      availableTemplates = [...templates.medium, ...templates.complex];
    }

    const template = this.getRandomItem(availableTemplates);
    
    if (template.includes('${nested}')) {
      const nestedStatement = this.generateStatementWithScope(depth + 1, templates, currentScope);
      return template
        .replace(/\${i}/g, this.generateUniqueName(`${currentScope}_var${this.counter}`))
        .replace(/\${value}/g, this.getRandomValue())
        .replace(/\${condition}/g, this.getRandomCondition())
        .replace(/\${nested}/g, nestedStatement);
    }

    return template
      .replace(/\${i}/g, this.generateUniqueName(`${currentScope}_var${this.counter}`))
      .replace(/\${value}/g, this.getRandomValue())
      .replace(/\${condition}/g, this.getRandomCondition());
  }

  generateJavaScriptFile() {
    this.counter = 0;
    this.usedNames.clear();
    const statements = [];
    
    statements.push('// Generated test file for AST parser');
    statements.push('// Statement length: ' + this.statementLength);
    statements.push('// Statement depth: ' + this.statementDepth);
    statements.push('');
    
    for (let i = 0; i < this.statementLength; i++) {
      const statement = this.generateStatementWithScope(1, STATEMENT_TEMPLATES, `main_${i}`);
      statements.push(statement);
    }
    
    statements.push('');
    statements.push('// Export some values for module testing');
    statements.push('export { };');
    
    return statements.join('\n');
  }
}

function parseArguments() {
  const args = process.argv.slice(2);
  const options = {
    length: DEFAULT_STATEMENT_LENGTH,
    depth: DEFAULT_STATEMENT_DEPTH,
    output: OUTPUT_DIR
  };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--length':
      case '-l':
        options.length = parseInt(args[++i]) || DEFAULT_STATEMENT_LENGTH;
        break;
      case '--depth':
      case '-d':
        options.depth = parseInt(args[++i]) || DEFAULT_STATEMENT_DEPTH;
        break;
      case '--output':
      case '-o':
        options.output = args[++i];
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
    }
  }

  return options;
}

function printHelp() {
  console.log(`
AST Test File Generator (JavaScript only)

Usage: node generate-test-files.js [options]

Options:
  -l, --length <number>     Number of statements to generate (default: ${DEFAULT_STATEMENT_LENGTH})
  -d, --depth <number>      Maximum nesting depth (default: ${DEFAULT_STATEMENT_DEPTH})
  -o, --output <path>       Output directory (default: ${OUTPUT_DIR})
  -h, --help               Show help message

Examples:
  node generate-test-files.js --length 1000 --depth 10
  node generate-test-files.js --output ./my-tests --length 200 --depth 3
`);
}

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function main() {
  const options = parseArguments();
  
  console.log('AST Test File Generator (JavaScript only)');
  console.log('=======================');
  console.log(`Statement length: ${options.length}`);
  console.log(`Statement depth: ${options.depth}`);
  console.log(`Output directory: ${options.output}`);
  console.log('');

  ensureDirectoryExists(options.output);

  const generator = new TestFileGenerator(options.length, options.depth);
  const content = generator.generateJavaScriptFile();
  const filename = `test-${options.length}statements-${options.depth}depth.js`;
  const filepath = path.join(options.output, filename);
  fs.writeFileSync(filepath, content);
  
  // Format the generated file with prettier
  try {
    console.log('Formatting generated file with prettier...');
    execSync(`npx prettier --write "${filepath}"`, { stdio: 'inherit' });
  } catch (error) {
    console.warn('Warning: Could not format file with prettier. Make sure prettier is installed.');
  }
  
  const stats = fs.statSync(filepath);
  console.log(`Generated: ${filename} (${(stats.size / 1024).toFixed(2)} KB)`);

  console.log('');
  console.log('Test file generated successfully!');
  console.log(`File saved to: ${options.output}`);
}

if (require.main === module) {
  main();
}

module.exports = { TestFileGenerator, parseArguments }; 