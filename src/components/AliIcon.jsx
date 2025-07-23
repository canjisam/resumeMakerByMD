import { Icon } from '@iconify/react';

export function AliIcon({ icon, className = '', size = 24, ...props }) {
  return (
    <Icon 
      icon={icon} 
      className={className}
      width={size}
      height={size}
      {...props}
    />
  );
}
