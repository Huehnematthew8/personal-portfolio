export default function NotFound() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "1rem" }}>
      <h1 style={{ fontFamily: "var(--sg)", fontSize: "4rem", fontWeight: 700 }}>404</h1>
      <p style={{ fontFamily: "var(--nr)", fontStyle: "italic", color: "var(--muted)" }}>Page not found.</p>
      <a href="/" style={{ fontFamily: "var(--sg)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--terracotta)", textDecoration: "none" }}>Back to Home</a>
    </div>
  );
}
