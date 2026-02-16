import * as React from 'react';
import { cn } from '@/lib/utils';

interface CharItemProps {
  char?: string;
  readonly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  borderColor?: string;
  className?: string;
}

const CharItem = React.forwardRef<HTMLDivElement, CharItemProps>(
  ({ char, readonly = true, value, onChange, borderColor, className }, ref) => {
    const defaultBorderColor = 'rgb(102 102 102)';

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-12 h-12 flex items-center justify-center font-serif text-xl border-2 border-solid',
          className
        )}
        style={{
          borderColor: borderColor || defaultBorderColor,
        }}
      >
        {readonly ? (
          <span className="text-ink-dark">{char}</span>
        ) : (
          <input
            type="text"
            maxLength={1}
            value={value || ''}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full h-full text-center bg-transparent outline-none text-ink-dark font-serif text-xl"
            style={{ caretColor: 'rgb(196 92 72)' }}
          />
        )}
        <div
          className="absolute top-1/2 left-0 right-0 h-px bg-ink-light opacity-30"
          style={{ transform: 'translateY(-50%)' }}
        />
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px bg-ink-light opacity-30"
          style={{ transform: 'translateX(-50%)' }}
        />
      </div>
    );
  }
);

CharItem.displayName = 'CharItem';

export { CharItem };
