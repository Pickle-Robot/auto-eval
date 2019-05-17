#!/usr/bin/env node

const copy = require('copy-template-dir');
const path = require('path');
const log = require('signale');
const fs = require('fs');
const changeCase = require('change-case');
const [, , name, description] = process.argv;

const { version } = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../lerna.json'), 'utf8')
);
const inDir = path.join(__dirname, './template-plugin');
const kebab = changeCase.paramCase(name);
const outDir = path.join(__dirname, '../plugins', kebab);

fs.mkdirSync(outDir);

const vars = {
  description,
  version,
  title: changeCase.titleCase(name),
  kebab,
  pascal: changeCase.pascalCase(name)
};

copy(inDir, outDir, vars, (err, createdFiles) => {
  if (err) {
    throw err;
  }

  createdFiles.forEach(filePath =>
    log.info(`Created ${path.relative(outDir, filePath)}`)
  );
  log.success(`Created @auto-it/${kebab} plugin!`);
});
