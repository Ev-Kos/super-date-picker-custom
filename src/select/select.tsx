import { useEffect, useRef, useState, type KeyboardEvent } from 'react';

import styles from './select.module.css';

export type TOption = {
  label: string;
  value: string;
};

type SelectProps = {
  options: TOption[];
  value?: TOption | null;
  onChange?: (value: TOption) => void;
  label: string;
};

export const Select = ({ options, value = null, onChange, label }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<TOption | null>(value);
  const selectRef = useRef<HTMLDivElement>(null);

  const listboxId = useRef(`listbox-${Math.random().toString(36).substring(2, 11)}`).current;

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value: TOption) => {
    setSelectedValue(value);
    onChange?.(value);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
      default:
        break;
    }
  };

  const handleOptionKeyDown = (e: KeyboardEvent<HTMLLIElement>, option: TOption) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleSelect(option);
    }
  };

  return (
    <div
      ref={selectRef}
      className={styles.select_wrap}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls={listboxId}
    >
      <button
        className={styles.select}
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className={styles.value}>{label}</div>
        <p className={styles.arrow}>&gt;</p>
      </button>

      {isOpen && (
        <ul className={styles.list} role="listbox" id={listboxId}>
          {options.map((option) => (
            <li
              key={option.value}
              className={
                option.value === selectedValue?.value ? styles.select_option : styles.option
              }
              onClick={() => handleSelect(option)}
              role="option"
              onKeyDown={(e) => handleOptionKeyDown(e, option)}
              aria-selected={option.value === selectedValue?.value}
              tabIndex={0}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
