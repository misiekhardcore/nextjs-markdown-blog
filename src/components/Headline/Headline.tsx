import './Headline.scss';

type HeadlineProps = {
  title: string;
  description: string;
  topic?: string;
};

export function Headline({ description, title, topic }: HeadlineProps) {
  return (
    <div className="Headline">
      {topic && <p className="topic">Topic: {topic}</p>}
      <h1>{title}</h1>
      <p className="description">{description}</p>
    </div>
  );
}
