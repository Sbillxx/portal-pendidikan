export default function Example({event,  children }) {
  return (
    <button
    onClick={event}
      type="button"
      className="flex flex-shrink-0 items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}
