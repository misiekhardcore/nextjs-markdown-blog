import Link from 'next/link';

import { ARTCILES_ROUTE } from '@/constants';

import './Header.scss';

type NavLink = {
  name: string;
  href: string;
};

const navLinks: NavLink[] = [
  { href: '/', name: 'Home' },
  { href: ARTCILES_ROUTE, name: 'Articles' },
];

export function Header() {
  return (
    <header className="Header">
      <Link href="/">
        <h1>My Blog</h1>
      </Link>
      <nav className="links">
        {navLinks.map(({ href, name }) => (
          <Link key={href} href={href} className="HeaderLink">
            {name}
          </Link>
        ))}
      </nav>
    </header>
  );
}
