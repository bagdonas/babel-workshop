import { it, expect } from 'vitest'
import babel from '@babel/core';

import plugin from './index';

const plugins = [
  '@babel/plugin-syntax-jsx',
  plugin,
];

it('converts JSX intrinsic element to React.createElement call', () => {
  const source = `<div/>`
  const result = babel.transformSync(source, {plugins});  
  expect(result?.code).toMatchInlineSnapshot(`"React.createElement("div", null);"`);
});

it('converts JSX component to React.createElement call', () => {
  const source = `<Duck/>`
  const result = babel.transformSync(source, {plugins});  
  expect(result?.code).toMatchInlineSnapshot(`"React.createElement(Duck, null);"`);
});

it('converts nested JSX elements', () => {
  const source = `<div><span/></div>`
  const result = babel.transformSync(source, {plugins});  
  expect(result?.code).toMatchInlineSnapshot(`"React.createElement("div", null, React.createElement("span", null));"`);
});