const Divider = ({ children }) => {
  return (
    <>
      <span className="flex items-center mt-[300px]">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-600"></span>

        <span className="shrink-0 px-4 text-gray-900 dark:text-white">{children}</span>

        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-600"></span>
      </span>
    </>
  );
}

export default Divider;
