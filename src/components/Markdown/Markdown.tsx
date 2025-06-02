import { AnchorHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import type { Components } from 'react-markdown';

import './Markdown.scss';
import Link from 'next/link';

interface MarkdownProps {
  markdown: string;
  isPreview?: boolean;
}

export function Markdown({ markdown, isPreview }: MarkdownProps) {
  return (
    <div className="Markdown">
      <ReactMarkdown
        components={getComponents(isPreview)}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}

function getComponents(isPreview?: boolean): Partial<Components> {
  const components: Partial<Components> = {};

  if (isPreview) {
    components.a = ({ children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      return (
        <span className="fakeLink" {...props}>
          {children}
        </span>
      );
    };
  } else {
    components.a = ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
      return <Link href={href || ''} {...props} />;
    };
  }

  return components;
}
