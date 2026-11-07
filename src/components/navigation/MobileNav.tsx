import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { sections } from "@/app/routes";

export function MobileHeader({
  active,
  open,
  onOpen,
}: {
  active: string;
  open: boolean;
  onOpen: () => void;
}) {
  const activeSection = sections.find((section) => section.id === active);

  return (
    <header className="mobile-header">
      <a className="mobile-header__brand" href="#home">
        <span className="brand__mark" aria-hidden="true">
          SG
        </span>
        <span>
          <span className="mobile-header__name">SHISHIR</span>
          <span className="mobile-header__section">
            {activeSection ? `${activeSection.index} / ${activeSection.label}` : "ARCHIVE"}
          </span>
        </span>
      </a>
      <button
        type="button"
        className="mobile-header__menu"
        onClick={onOpen}
        aria-expanded={open}
        aria-controls="mobile-index"
      >
        <Menu size={16} aria-hidden="true" />
        INDEX
      </button>
    </header>
  );
}

export function MobileNav({
  open,
  active,
  onClose,
}: {
  open: boolean;
  active: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }
    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      id="mobile-index"
      ref={dialogRef}
      className="mobile-nav"
      aria-labelledby="mobile-nav-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div className="mobile-nav__panel">
        <div className="mobile-nav__head">
          <div>
            <p className="eyebrow">ARCHIVE DIRECTORY</p>
            <h2 id="mobile-nav-title" className="mobile-nav__title">
              INDEX
            </h2>
          </div>
          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close archive index"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Archive sections">
          <ul className="mobile-nav__list">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`mobile-nav__link${active === section.id ? " is-active" : ""}`}
                  aria-current={active === section.id ? "true" : undefined}
                  onClick={onClose}
                >
                  <span>{section.index}</span>
                  <span>{section.label}</span>
                  <span className="mobile-nav__dimension">{section.dimension}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mobile-nav__foot">
          STATIC ARCHIVE / NO TRACKERS / PUBLIC DATA ONLY
        </p>
      </div>
    </dialog>
  );
}
