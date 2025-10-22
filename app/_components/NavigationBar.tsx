'use client'; // Client component for interactivity
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'My Insurance', path: '/insurance' },
  { label: 'My Health', path: '/health' },
  { label: 'My Cost', path: '/cost' },
];

export default function NavigationBar() {
  const pathname = usePathname();

  return (
    <nav style={{ backgroundColor: '#004080', display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
      {navItems.map(({ label, path }) => (
        <Link key={path} href={path} style={{
                color: pathname === path ? '#FFD700' : '#FFFFFF',
                fontWeight: pathname === path ? 'bold' : 'normal',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                backgroundColor: pathname === path ? '#003366' : 'transparent'
     }}>
        {label}
        </Link>
      ))}
    </nav>
  );
}
