import './DateTime.scss';

type DateTimeProps = {
  date: Date;
};

export function DateTime({ date }: DateTimeProps) {
  return <time className="DateTime">{date.toLocaleString()}</time>;
}
