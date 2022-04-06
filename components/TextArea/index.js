export const TextArea = ({
  id,
  label,
  value,
  name,
  onChange,
  className,
  placeholder,
  disabled,
  onClick,
}) => {
  var layout =
    "mx-2 my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-black leading-tight focus:outline-none focus:bg-white focus:border-blue-bondi";
  var style = {
    resize: "none",
  };
  return (
    <div className="w-full">
      <label className="pl-2 font-medium">
        {label}
        <textarea
          id={id}
          style={style}
          disabled={disabled}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={layout + " " + className}
          onClick={onClick}
        ></textarea>
      </label>
    </div>
  );
};
