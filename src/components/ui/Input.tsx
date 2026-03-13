import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                className={cn(
                    'w-full bg-gray-100 border-none rounded-xl py-2 px-4 text-sm focus:ring-0 focus:outline-none placeholder-gray-500 transition-colors',
                    className
                )}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export { Input };
