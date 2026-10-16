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

/**
 * Saving rewrites a JSON file, which makes the dev server reload the page. Remember the
 * scroll position before each save and return to it after the reload, so editing
 * further down the page doesn't jump back to the top.
 */
const SCROLL_KEY = "editable-scroll";
if (import.meta.env.DEV && typeof window !== "undefined") {
  const saved = sessionStorage.getItem(SCROLL_KEY);
  if (saved) {
    sessionStorage.removeItem(SCROLL_KEY);
    const target = Number(saved);
    const started = Date.now();
    // The page renders after this runs, so keep trying until it's tall enough (up to 3s).
    const restore = () => {
      window.scrollTo(0, target);
      if (Math.abs(window.scrollY - target) > 2 && Date.now() - started < 3000) requestAnimationFrame(restore);
    };
    requestAnimationFrame(restore);
  }
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
  const before = useRef<string | null>(null);

  const handleBlur = useCallback(async () => {
    const el = ref.current;
    if (!el || saving.current) return;
    // An element being replaced (after a save elsewhere) can blur on its way out; never save from it.
    if (!el.isConnected) return;

    // Clean up what the browser adds while editing: trailing (non-breaking) spaces and
    // runs of blank lines from pressing Enter, so a paragraph break is always one blank line.
    const value = el.innerText
      .replace(/\u00a0/g, " ")
      .replace(/[ \t]+\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    if (value === before.current) return; // clicked in and out without changing anything
    saving.current = true;
    sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));

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
      onFocus={() => (before.current = ref.current?.innerText ?? null)}
      onBlur={handleBlur}
      className={`${className} editable-field`}
      style={{ outline: "none" }}
    >
      {children}
    </Tag>
  );
}
