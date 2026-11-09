import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
const storageKey = "portfolio-theme";
function savedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(storageKey);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "light" ? "light" : "dark",
  );
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#081b2d" : "#f4f7fa");
  }, [theme]);
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const sync = () =>
      setTheme(savedTheme() ?? (media.matches ? "dark" : "light"));
    const systemChange = () => {
      if (!savedTheme()) sync();
    };
    media.addEventListener("change", systemChange);
    sync();
    window.addEventListener("storage", sync);
    return () => {
      media.removeEventListener("change", systemChange);
      window.removeEventListener("storage", sync);
    };
  }, []);
  return (
    <button
      className="theme-toggle"
      aria-label="Tema claro"
      aria-pressed={theme === "light"}
      title={`Ativar tema ${theme === "dark" ? "claro" : "escuro"}`}
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        try {
          localStorage.setItem(storageKey, next);
        } catch {
          /* Keep the control usable without storage. */
        }
        setTheme(next);
      }}
    >
      {theme === "dark" ? (
        <Sun size={19} aria-hidden="true" />
      ) : (
        <Moon size={19} aria-hidden="true" />
      )}
    </button>
  );
}

export function useActiveSection() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const sections = [
      "sobre",
      "competencias",
      "projetos",
      "formacao",
      "contato",
    ]
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => !!node);
    let frame = 0;
    const update = () => {
      frame = 0;
      const current =
        sections
          .filter((node) => node.getBoundingClientRect().top <= 180)
          .at(-1)?.id ?? "";
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return active;
}
