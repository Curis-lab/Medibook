import { Label } from "radix-ui";

export function InputWithLabel({ label, htmlFor, id, defaultValue, onChange }) {
  return (
    <div className="flex items-center justify-between max-w-[350px]">
      <Label.Root className="" htmlFor={htmlFor}>
        {label}
      </Label.Root>
      <input
        onChange={onChange}
        style={{
          border: "1px solid blue",
        }}
        className="w-[200px] inline-flex align-middle justify-center rounded-[4px] px-[10px] h-[35px] leading-1"
        type="text"
        id={id}
        defaultValue={defaultValue}
      />
    </div>
  );
}
