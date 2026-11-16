import { useEffect } from 'react';

export default function ContextMenu({ x, y, items, onClose }) {
  useEffect(() => {
    const close = () => onClose();
    window.addEventListener('pointerdown', close);
    window.addEventListener('blur', close);
    return () => {
      window.removeEventListener('pointerdown', close);
      window.removeEventListener('blur', close);
    };
  }, [onClose]);

  const height = items.length * 34 + 16;

  return (
    <div
      className="context-menu"
      role="menu"
      style={{
        left: Math.min(x, Math.max(8, window.innerWidth - 240)),
        top: Math.min(y, Math.max(8, window.innerHeight - height - 56)),
      }}
      onPointerDown={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.preventDefault()}
    >
      {items.map((item, index) =>
        item.separator ? (
          <div key={`separator-${index}`} className="menu-separator" />
        ) : (
          <button
            key={item.label}
            type="button"
            role="menuitem"
            className="menu-item"
            onClick={() => {
              item.onSelect?.();
              onClose();
            }}
          >
            {item.icon && <item.icon size={15} aria-hidden="true" />}
            <span>{item.label}</span>
          </button>
        ),
      )}
    </div>
  );
}
