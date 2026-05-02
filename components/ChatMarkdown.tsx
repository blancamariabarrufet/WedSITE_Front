import type { ReactNode } from "react";

type ChatMarkdownProps = {
  children: string;
  streaming?: boolean;
};

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const boldPattern = /\*\*([^*]+)\*\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = boldPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <strong key={`${match.index}-${match[1]}`} className="chat-markdown-strong">
        {match[1]}
      </strong>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

export function ChatMarkdown({ children, streaming = false }: ChatMarkdownProps) {
  const paragraphs = children.split(/\n{2,}/).filter((paragraph) => paragraph.length > 0);

  if (paragraphs.length === 0) {
    return streaming ? <span className="chat-stream-caret" aria-hidden="true" /> : null;
  }

  return (
    <div className="chat-markdown">
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>
          {renderInline(paragraph)}
          {streaming && index === paragraphs.length - 1 && <span className="chat-stream-caret" aria-hidden="true" />}
        </p>
      ))}
    </div>
  );
}
