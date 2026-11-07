import { useEffect, useRef, useState } from "react";
import { identity } from "@/data";

type LineKind = "input" | "output" | "system" | "error";

interface TerminalLine {
  id: number;
  kind: LineKind;
  text: string;
}

const WELCOME: Omit<TerminalLine, "id">[] = [
  { kind: "system", text: "ARCHIVE TERMINAL / LINK ESTABLISHED" },
  { kind: "output", text: "Type 'help' to inspect the record." },
  { kind: "output", text: "Local interface simulation. No shell access." },
];

const COMMANDS = ["help", "whoami", "status", "focus", "links", "clear"];

function responseFor(command: string): Omit<TerminalLine, "id">[] {
  switch (command) {
    case "help":
      return [
        { kind: "output", text: "AVAILABLE COMMANDS" },
        { kind: "output", text: "  whoami   identity record" },
        { kind: "output", text: "  status   operating state" },
        { kind: "output", text: "  focus    current technical interests" },
        { kind: "output", text: "  links    public profiles" },
        { kind: "output", text: "  clear    clear the output" },
      ];
    case "whoami":
      return [
        { kind: "output", text: identity.name.toUpperCase() },
        { kind: "output", text: identity.roles.join(" / ").toUpperCase() },
        { kind: "output", text: "CO-FOUNDER & CTO / TVARA" },
      ];
    case "status":
      return [
        { kind: "output", text: "ARCHIVE: ONLINE" },
        { kind: "output", text: "BUILD: STATIC / GITHUB PAGES" },
        { kind: "output", text: "BACKEND: NONE" },
        { kind: "output", text: "TRACKERS: NONE" },
      ];
    case "focus":
      return [
        { kind: "output", text: "CURRENT FOCUS" },
        ...identity.currentFocus.map((item) => ({
          kind: "output" as const,
          text: `  ${item.toUpperCase()}`,
        })),
      ];
    case "links":
      return [
        { kind: "output", text: "PUBLIC PROFILES" },
        ...identity.externalLinks.map((link) => ({
          kind: "output" as const,
          text: `  ${link.label.toUpperCase()}: ${link.url}`,
        })),
      ];
    default:
      return [
        {
          kind: "error",
          text: `command not found: ${command}. Type 'help' for the command list.`,
        },
      ];
  }
}

export function TerminalConsole() {
  const [lines, setLines] = useState<TerminalLine[]>(() =>
    WELCOME.map((line, index) => ({ ...line, id: index })),
  );
  const [value, setValue] = useState("");
  const nextId = useRef(WELCOME.length);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const output = outputRef.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [lines]);

  const makeLine = (kind: LineKind, text: string): TerminalLine => {
    const line = { id: nextId.current, kind, text };
    nextId.current += 1;
    return line;
  };

  const runCommand = (raw: string) => {
    const command = raw.trim();
    if (command.length === 0) return;

    if (command.toLowerCase() === "clear") {
      setLines([]);
      setValue("");
      return;
    }

    setLines((current) => {
      const next = [...current, makeLine("input", command)];
      return [...next, ...responseFor(command.toLowerCase()).map((line) =>
        makeLine(line.kind, line.text),
      )].slice(-60);
    });
    setValue("");
  };

  return (
    <div className="terminal">
      <div className="terminal__bar">
        <span className="terminal__lights" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="terminal__title">guest@archive: ~</span>
        <span className="terminal__mode">LOCAL</span>
      </div>

      <div
        className="terminal__output"
        ref={outputRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {lines.map((line) => (
          <p key={line.id} className={`terminal__line terminal__line--${line.kind}`}>
            <span className="terminal__marker" aria-hidden="true">
              {line.kind === "input" ? "$" : line.kind === "error" ? "!" : ">"}
            </span>
            <span>{line.text}</span>
          </p>
        ))}
        {lines.length === 0 ? (
          <p className="terminal__line terminal__line--system">
            <span className="terminal__marker" aria-hidden="true">
              &gt;
            </span>
            <span>Output cleared. Type &apos;help&apos; to continue.</span>
          </p>
        ) : null}
      </div>

      <div className="terminal__chips" aria-label="Quick commands">
        {COMMANDS.filter((command) => command !== "clear").map((command) => (
          <button
            key={command}
            type="button"
            className="terminal__chip"
            onClick={() => {
              runCommand(command);
            }}
          >
            {command}
          </button>
        ))}
      </div>

      <form
        className="terminal__form"
        onSubmit={(event) => {
          event.preventDefault();
          runCommand(value);
        }}
      >
        <label className="sr-only" htmlFor="terminal-input">
          Terminal command
        </label>
        <span className="terminal__prompt" aria-hidden="true">
          guest@archive:~$
        </span>
        <input
          id="terminal-input"
          className="terminal__input"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          placeholder="type a command…"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
