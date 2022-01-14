export function mergeEventHandlers<
  EventType extends React.SyntheticEvent | Event
>(
  userHandler: (event: EventType) => any | undefined,
  libraryHandler: (event: EventType) => any
): (event: EventType) => any {
  return (event) => {
    userHandler?.(event);
    if (!event.defaultPrevented) return libraryHandler(event);
  };
}
