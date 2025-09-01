import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="app-header">
      <div className="container mx-auto">
        <Link href="/">
            <Image 
              src="/logo-neuvye-clara.png" 
              alt="Neuvye Logo" 
              width={120} 
              height={30}
              priority
            />
        </Link>
      </div>
    </header>
  );
}
