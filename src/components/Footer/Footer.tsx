import Link from 'next/link';

type FooterLink = {
  name: string;
  href: string;
};

const links: FooterLink[] = [
  { name: 'GitHub', href: 'https://github.com/' },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { name: 'Email', href: 'mailto: email@example.com' },
];

export function Footer() {
  return (
    <footer className="Footer">
      <div className="links">
        {links.map(({ name, href }) => (
          <Link key={name} title={name} href={href} className="FooterLink" target="_blank">
            {name}
          </Link>
        ))}
      </div>
    </footer>
  );
}
