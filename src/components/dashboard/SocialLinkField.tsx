import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function SocialLinkField({
  title,
  url,
  change,
  deleteItem,
  disabled,
}: {
  title: string;
  url: string;
  change: (data: any) => void;
  deleteItem: () => void;
  disabled?: boolean;
}) {
  const [data, setData] = useState({ title: title, url: url });

  useEffect(() => {
    change(data);
  }, [data]);

  return (
    <div className="flex items-center gap-3">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        required
        disabled={disabled}
      />
      <Input
        placeholder="URL"
        value={url}
        onChange={(e) => setData({ ...data, url: e.target.value })}
        required
        disabled={disabled}
      />
      <Button
        size="icon"
        variant="outline"
        className="shrink-0"
        onClick={deleteItem}
        type="button"
        disabled={disabled}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
