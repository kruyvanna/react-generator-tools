import { IApi } from 'umi';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import * as types from '@babel/types';
import * as parser from '@babel/parser';
import generate from '@babel/generator';

/**
 * Load the contents of the constant file
 * @param api
 */
export function getConstantConfig(api: IApi) {
  const constantFilePath = api.paths.absSrcPath + '/constant.ts';
  if (!existsSync(constantFilePath)) {
    writeFileSync(constantFilePath, '', 'utf-8');
    return '';
  } else {
    const ast: types.File = parser.parse(readFileSync(constantFilePath, 'utf-8'), {
      sourceType: 'module',
      plugins: ['typescript'],
    });
    return generate(ast, {}).code;
  }
}

/**
 * Save the modified constant configuration
 * @param api
 * @param code
 */
export function saveConstantConfig(api: IApi, code: string) {
  const constantFilePath = api.paths.absSrcPath + '/constant.ts';
  writeFileSync(constantFilePath, code, 'utf-8');
}
