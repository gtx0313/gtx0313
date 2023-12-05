import { Icon, IconifyIcon } from '@iconify/react';
import { Box, Sx } from '@mantine/core';

interface Props {
  icon: IconifyIcon | string;
  width?: number;
  height?: number;
  className?: string;
}

export default function Iconify({ icon, className, width, height }: Props) {
  return <Icon className={className} icon={icon} width={width} height={height} />;
}
