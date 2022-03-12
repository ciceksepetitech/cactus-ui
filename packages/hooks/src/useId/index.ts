/**
 * useId
 *
 * Autogenerate ids to facilitate WAI-ARIA and server rendering
 *
 * Note: The returned ID will initially be `null` and will update after a
 * component mounts. Users may need to supply their own ID if they need
 * consistent values for SSR.
 *
 * Implementation copy/pasted from https://reach.tech/auto-id
 *
 * @author https://reach.tech/auto-id
 * @reference https://reach.tech/auto-id
 */

import * as React from 'react';
import { useIsomorphicLayoutEffect } from '..';

let id = 0;
const genId = () => ++id;

let serverHandoffComplete = false;

function useId(idFromProps: string): string;
function useId(idFromProps: string | undefined): string | undefined;
function useId(idFromProps?: null): string | undefined;
function useId(idFromProps?: string | null) {
  const initialId = idFromProps || (serverHandoffComplete ? genId() : null);
  const [id, setId] = React.useState(initialId);

  useIsomorphicLayoutEffect(() => {
    if (id === null) setId(genId());
  }, []);

  React.useEffect(() => {
    if (serverHandoffComplete === false) serverHandoffComplete = true;
  }, []);

  return id != null ? String(id) : undefined;
}

export { useId };

export default useId;
