import { Link } from "react-router";
import ColorBends from "./ColorBends";

export function GlitchHero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 20px 80px",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <ColorBends
          colors={["#1a472a", "#2d5a3f", "#61dca3", "#4a9c6d"]}
          speed={0.3}
          rotation={45}
          scale={1.2}
          frequency={1.5}
          warpStrength={1.2}
          mouseInfluence={0.5}
          parallax={0.3}
          noise={0.05}
          transparent
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: "900px",
          width: "100%",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(6px)",
            borderRadius: "8px",
            padding: "0.5rem 1rem",
            fontSize: "0.75rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "1.5rem",
            color: "#0f172a",
          }}
        >
          Security Middleware
        </div>

        {/* Logo Text */}
        <h1
          style={{
            fontSize: "clamp(4rem,10vw,7rem)",
            fontWeight: 800,
            letterSpacing: "0.15em",
            marginBottom: "1.5rem",
            background:
              "linear-gradient(90deg,#00ffa6 0%,#00d4ff 50%,#2563eb 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 25px rgba(0,255,170,0.5))",
          }}
        >
          VIGIL
        </h1>

        {/* Subheadline */}
        <p
          style={{
            marginBottom: "2.5rem",
            color: "#0f172a",
            maxWidth: "640px",
            marginInline: "auto",
            fontSize: "clamp(1rem,2vw,1.25rem)",
            lineHeight: 1.6,
          }}
        >
          Enterprise-grade security middleware for modern web applications.
          Block bots, prevent SQL injection, rate limit abuse, and verify
          emails all in one powerful package.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/docs"
            style={{
              background: "#2563eb",
              color: "white",
              padding: "1rem 2rem",
              fontWeight: 700,
              borderRadius: "8px",
              textDecoration: "none",
              boxShadow: "0 10px 30px rgba(37,99,235,0.4)",
            }}
          >
            Get Started
          </Link>

          <Link
            to="/docs"
            style={{
              background: "rgba(255,255,255,0.6)",
              backdropFilter: "blur(8px)",
              color: "#0f172a",
              padding: "1rem 2rem",
              fontWeight: 700,
              borderRadius: "8px",
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            View Docs
          </Link>
        </div>

        {/* Stats */}
        <div
          style={{
            marginTop: "3rem",
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            fontSize: "0.9rem",
          }}
        >
          <div>
            <span style={{ fontWeight: 700, color: "#2563eb" }}>2</span> lines of
            code
          </div>

          <div>
            <span style={{ fontWeight: 700, color: "#2563eb" }}>6</span> security
            modules
          </div>

          <div>
            <span style={{ fontWeight: 700, color: "#2563eb" }}>&lt;1ms</span>{" "}
            latency
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "150px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}