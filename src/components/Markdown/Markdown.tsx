import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { Components } from 'react-markdown';

import './Markdown.scss';
import Link from 'next/link';
import { ReactNode } from 'react';

interface MarkdownProps {
  markdown: string;
  isPreview?: boolean;
}

export function Markdown({ markdown, isPreview }: MarkdownProps) {
  return (
    <ReactMarkdown
      components={getComponents(isPreview)}
      className="Markdown"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
    >
      {markdown}
    </ReactMarkdown>
  );
}

function getComponents(isPreview?: boolean): Partial<Components> {
  const components: Partial<Components> = {};

  if (isPreview) {
    components.a = ({ children }: { children: ReactNode }) => {
      return <span className="fakeLink">{children}</span>;
    };
  } else {
    components.a = Link;
  }

  return components;
}
