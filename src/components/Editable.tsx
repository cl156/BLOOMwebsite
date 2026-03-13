/**
 * <Editable> — inline content editing in dev mode.
 *
 * In development: renders a contentEditable element that saves to disk on blur.
 * In production: renders plain children with zero overhead.
 */
import { useRef, useCallback, type ReactNode, type ElementType } from "react";

interface EditableProps {
  /** JSON filename inside src/content/, e.g. "whatBloomIs.json" */
  file: string;
  /** Dot-separated key path, e.g. "heading" or "cards.0.desc" */
  path: string;
  /** HTML tag to render. Defaults to "span". */
  as?: ElementType;
  /** Class name passed through */
  className?: string;
  /** The text content (from the JSON import) */
  children: ReactNode;
}

export default function Editable({
  file,
  path,
  as: Tag = "span",
  className = "",
  children,
}: EditableProps) {
  // Production: just render children
  if (!import.meta.env.DEV) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <EditableInner file={file} path={path} as={Tag} className={className}>
      {children}
    </EditableInner>
  );
}

/** Dev-only inner component with contentEditable behavior */
function EditableInner({
  file,
  path,
  as: Tag = "span",
  className = "",
  children,
}: EditableProps) {
  const ref = useRef<HTMLElement>(null);
  const saving = useRef(false);

  const handleBlur = useCallback(async () => {
    const el = ref.current;
    if (!el || saving.current) return;

    const value = el.innerText;
    saving.current = true;

    try {
      await fetch("/__save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file, path, value }),
      });
    } catch (e) {
      console.error("[Editable] save failed:", e);
    } finally {
      saving.current = false;
    }
  }, [file, path]);

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={handleBlur}
      className={`${className} editable-field`}
      style={{ outline: "none" }}
    >
      {children}
    </Tag>
  );
}
