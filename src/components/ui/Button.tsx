import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg' | 'icon';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const variants = {
            primary: 'bg-black text-white hover:bg-gray-800 disabled:bg-gray-200 disabled:text-gray-400',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
            outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700',
            ghost: 'hover:bg-gray-100 text-gray-600'
        };

        const sizes = {
            sm: 'px-3 py-1.5 text-xs',
            md: 'px-5 py-2 text-sm',
            lg: 'px-8 py-3 text-base',
            icon: 'p-2'
        };

        return (
            <button
                ref={ref}
                className={cn(
                    'inline-flex items-center justify-center rounded-full font-bold transition-all active:scale-95 disabled:pointer-events-none',
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';

export { Button };
