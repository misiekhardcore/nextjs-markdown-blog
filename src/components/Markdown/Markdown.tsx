import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

import './Markdown.scss';

type MarkdownProps = {
  markdown: string;
};

export function Markdown({ markdown }: MarkdownProps) {
  return (
    <ReactMarkdown className="Markdown" remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
      {markdown}
    </ReactMarkdown>
  );
}
