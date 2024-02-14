"use client";
interface Props {
  name: string;
  getter: string;
  setter: string;
}

export default function EditableLink({ name, getter, setter }: Props) {
  return (
    <form>
      <input placeholder={`${name} url`} />
    </form>
  );
}
