'use client';

import { useEffect, useState } from 'react';

interface DateDisplayProps {
  date: Date | string;
  format?: 'short' | 'long';
  className?: string;
}

export default function DateDisplay({ date, format = 'short', className = '' }: DateDisplayProps) {
  const [formattedDate, setFormattedDate] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    
    if (format === 'long') {
      setFormattedDate(dateObj.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    } else {
      setFormattedDate(dateObj.toLocaleDateString('zh-CN'));
    }
  }, [date, format]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <span className={className}>加载中...</span>;
  }

  return <span className={className}>{formattedDate}</span>;
}