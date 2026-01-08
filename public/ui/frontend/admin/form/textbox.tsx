import { Field, Input, Label, Textarea } from "@headlessui/react";

export default function TextBox({
  name,
  title,
  onTextChange,
  value = "",
  type = "input",
}: {
  name: string;
  title: string;
  onTextChange: (value: string) => void;
  value?: string;
  type?: "input" | "textarea" ;
}) {
  return (
    <Field>
      <Label className="text-xl font-semibold">{title}</Label>
      <Input
        as={type}
        name={name}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onTextChange(e.target.value)
        }
        className="mt-3 block w-full
                    border border-gray-400 rounded-lg
                    px-3 py-2 text-sm/6
                    focus:not-data-focus:outline-none 
                    data-focus:outline-4  data-focus:outline-gray-600/25 data-focus:transition-all duration-20 ease-in-out"
      />
    </Field>
  );
}
