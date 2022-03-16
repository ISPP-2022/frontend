export const Tags = ({ tags }) => {
  const result = [];

  tags?.forEach((value) => {
    result.push(
      <div key={value} className="rounded-full bg-white border border-blue-bondi text-blue-bondi px-3 py-1 mx-1 my-2">
        {value}
      </div>
    );
  });
  return (
    <div className="max-w flex flex-nowrap border-t border-b border-blue-bondi overflow-auto">
      {result}
    </div>
  );
};
