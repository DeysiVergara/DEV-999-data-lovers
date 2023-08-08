import acorn from 'acorn'
import fs from 'fs';

//read analyzer.js file
const code = fs.readFileSync("src/data.js", "utf8");
//parse the file
const ast = acorn.parse(code, { ecmaVersion: 2020, sourceType: "module" });

const getASTMetrics = (node, [
  parseIntCalls,
  parseFloatCalls,
  NumberCalls,
  sortCalls,
  filterCalls,
  reduceCalls,
  // letStatements,
  constStatements,
  forStatements,
  ifelseStatements,
  exportStatements,
]) => {

  if (node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    node.callee.name === "parseInt") {
    parseIntCalls.push(node);
  }

  if (node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    node.callee.name === "parseFloat") {
    parseFloatCalls.push(node);
  }

  if (node.type === "CallExpression" &&
    node.callee.type === "Identifier" &&
    node.callee.name === "Number") {
    NumberCalls.push(node);
  }

  if (node.type === "CallExpression" &&
    node.callee.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    node.callee.property.name === "sort") {
    sortCalls.push(node);
  }

  if (node.type === "CallExpression" &&
    node.callee.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    node.callee.property.name === "filter") {
    filterCalls.push(node);
  }

  if (node.type === "CallExpression" &&
    node.callee.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    node.callee.property.name === "reduce") {
    reduceCalls.push(node);
  }

  if (node.type === "CallExpression" &&
    node.callee.type === "MemberExpression" &&
    node.callee.property.type === "Identifier" &&
    node.callee.property.name === "sort") {
    sortCalls.push(node);
  }

  // if (node.type === "VariableDeclaration" && node.kind === "let") {
  //   letStatements.push(node);
  // }

  if (node.type === "VariableDeclaration" && node.kind === "const") {
    constStatements.push(node);
  }

  if (node.type === "ForStatement" && node.kind === "for") {
    forStatements.push(node);
  }

  if (node.type === "IfStatement") {
    ifelseStatements.push(node);
  }

  if ([
    "ExportDeclaration",
    "ExportAllDeclaration",
    "ExportNamedDeclaration",
    "ExportDefaultDeclaration",
    "ExportSpecifier",
    "ExportDefaultSpecifier",
  ].includes(node.type)) {
    exportStatements.push(node);
  }

  for (const key in node) {
    /* eslint-disable-next-line no-prototype-builtins */
    if (node.hasOwnProperty(key)) {
      const child = node[key];
      if (typeof child === "object" && child !== null) {
        getASTMetrics(child, [
          parseIntCalls,
          parseFloatCalls,
          NumberCalls,
          sortCalls,
          filterCalls,
          reduceCalls,
          forStatements,
          // letStatements,
          constStatements,
          ifelseStatements,
          exportStatements,
        ]);
      }
    }
  }
}

const metrics = [[], [], [], [], [], [], [], [], [], []];
getASTMetrics(ast, metrics);
const [
  parseIntCalls,
  parseFloatCalls,
  NumberCalls,
  sortCalls,
  filterCalls,
  reduceCalls,
  // letStatements,
  constStatements,
  forStatements,
  ifelseStatements,
  exportStatements,
] = metrics;

describe('Tipos de datos primitivos', () => {
  it('Se convierten valores tipo "string" a tipo "number" con "parseInt" o "parseFloat" o "Number"', () => {
    expect(parseIntCalls.length + parseFloatCalls.length + NumberCalls.length).toBeGreaterThan(0);
  });
});

describe('Arrays', () => {
  it('Se usan métodos para manipular arrays como "sort"', () => {
    expect(sortCalls.length).toBeGreaterThan(0);
  });
  it('Se usan métodos para manipular arrays como "filter"', () => {
    expect(filterCalls.length).toBeGreaterThan(0);
  });
  it('Se usan métodos para manipular arrays como "reduce"', () => {
    expect(reduceCalls.length).toBeGreaterThan(0);
  });
  it('Se declaran variables con "for"', () => {
    expect(forStatements.length).toBeGreaterThan(0);
  });
});

describe('Variables', () => {
  // it('Se declaran variables con "let"', () => {
  //   expect(letStatements.length).toBeGreaterThan(0);
  // });

  it('Se declaran variables con "const"', () => {
    expect(constStatements.length).toBeGreaterThan(0);
  });
});

describe('Uso de condicionales', () => {
  it('Se usa el statement "if...else"', () => {
    expect(ifelseStatements.length).toBeGreaterThan(0);
  });
});

describe('Módulos de ECMAScript', () => {
  it('Se usa "export"', () => {
    expect(exportStatements.length).toBeGreaterThan(0);
  });
});