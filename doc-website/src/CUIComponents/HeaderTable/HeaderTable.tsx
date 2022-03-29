import React from 'react';

import CopyButton from './CopyButton';
import { IHeaderProps } from './interfaces';

function HeaderTable({ data }: IHeaderProps) {
  const packageName = data.instruction.packageName.substring(
    data.instruction.packageName.indexOf('@') + 1
  );

  return (
    <table className="cui-vtable b-none m-0" key={data.instruction.packageName}>
      <thead>
        <tr className="cui-vtable__row b-none">
          <th className="row--header b-none">install</th>
          <th className="row--header b-none">version</th>
          <th className="row--header b-none">usage</th>
          {data.instruction?.hasDefaultStyle && (
            <th className="row--header b-none">style</th>
          )}
        </tr>
      </thead>

      <tbody>
        <tr className="cui-vtable__row b-none">
          <td className="row--data b-none">
            {data.instruction.packageName}
            <CopyButton text={data.instruction.packageName} />
          </td>
          <td className="row--data b-none">{data.instruction.version}</td>
          <td className="row--data b-none">
            <span className="c-fuchsia700  min-height15">import</span>
            <span className="d-inline-block min-height15">
              &nbsp;
              {`{${data.instruction.importName}}`}
              &nbsp;
            </span>
            <span className="c-fuchsia700 d-inline-block min-height15">
              from
            </span>
            <span className="c-green600 d-inline-block min-height15">
              &nbsp;'@{packageName}'
            </span>
            <CopyButton
              text={`import {${data.instruction.importName}} from '@${packageName}'`}
            />
          </td>
          {data.instruction?.hasDefaultStyle && (
            <td className="row--data b-none">
              <span className="c-fuchsia700 d-inline-block min-height15">
                import
              </span>
              <span className="c-green600 d-inline-block min-height15">
                &nbsp;'@{packageName}/style.css'
              </span>
              <CopyButton text={`import '@${packageName}/style.css'`} />
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
}

export default HeaderTable;
