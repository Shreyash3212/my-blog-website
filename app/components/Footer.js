export default function Footer() {
  return (
    <footer style={{
      background: "#24292F",
      color: "#fff",
      textAlign: "center",
      padding: "20px 0",
      marginTop: 48
    }}>
      <div className="container">
        <p>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</p>
      </div>
    </footer>
  );
}
