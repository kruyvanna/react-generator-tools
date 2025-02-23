/*

 * @Date: 2020-04-29 10:38:23
 * @LastEditors: 黄姗姗
 * @LastEditTime: 2020-05-22 17:21:04
 */
// ref:
// - https://umijs.org/plugin/develop.html
import { IApi } from '@umijs/types';
import { join } from 'path';

import generatePage from './manage';
import generateApi from './api';
import generateScreen from './screen';
import { getConstantConfig, saveConstantConfig } from './constantConfig';

export default function(api: IApi) {
  let mods = [];

  // @ts-ignore
  api.addUIPlugin(() => join(__dirname, '../dist/index.umd.js'));

  // @ts-ignore
  api.onUISocket(({ action, failure, success }) => {
    const { type, payload = {} } = action;
    if (type.includes('screen')) {
      const result = generateScreen(payload, api);
      if (result) {
        success({ success: true, message: 'Congratulations, the file was created successfully' });
      } else {
        failure({ success: false, message: 'Sorry, file creation failed' });
      }
    } else if (type.includes('apiGenerator')) {
      const { databases, baseClasses } = generateApi(api);
      if (databases === null) {
        failure({
          success: false,
          databases: null,
        });
      } else {
        success({
          success: true,
          databases,
          baseClasses,
        });
      }
    } else if (type.includes('constant')) {
      if (type === 'org.umi-plugin-page-creator.constantLoad') {
        const code = getConstantConfig(api);
        success({
          success: true,
          data: code,
        });
      } else if (type === 'org.umi-plugin-page-creator.constantSave') {
        saveConstantConfig(api, payload.code);
        success({
          success: true,
          message: 'The constant configuration is saved successfully',
        });
      }
    } else {
      const result = generatePage(payload, type, api);
      if (result) {
        success({ success: true, message: 'Congratulations, the file was created successfully' });
      } else {
        failure({ success: false, message: 'Sorry, the directory already exists' });
      }
    }
  });
}
