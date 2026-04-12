import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'dark';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  href,
  onClick,
  className = '',
  type = 'button',
  fullWidth = false,
  disabled = false,
}) => {
  const baseClass = `${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  const buttonContent = (
    <button type={type} className={`${baseClass} ${disabled ? styles.disabled : ''}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseClass}>
        {children}
      </Link>
    );
  }

  return buttonContent;
};
