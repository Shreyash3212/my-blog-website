'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header style={{
      background: "#24292F",
      color: "#fff",
      padding: "16px 0",
      marginBottom: 24,
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <h1 style={{margin: 0, fontSize: "1.5rem"}}>My Blog</h1>
        <nav>
          <Link href="/" style={{color:'#fff',marginRight:24}}>Home</Link>
          <Link href="/admin/dashboard" style={{color:'#fff'}}>Admin</Link>
        </nav>
      </div>
    </header>
  );
}
