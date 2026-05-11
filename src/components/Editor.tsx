import { ja } from "@blocknote/core/locales";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

interface Props {
  onChange: (value: string) => void;
  initialContent?: string | null;
}

export function Editor({ onChange, initialContent }: Props) {
  const editor = useCreateBlockNote({
    dictionary: ja,
    initialContent: initialContent ? JSON.parse(initialContent) : undefined, //
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme="light"
        onChange={() => onChange(JSON.stringify(editor.document))}
      />
    </div>
  );
}
