import React from 'react';
import { cn } from '../../utils/cn';

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const Avatar = ({ className, size = 'md', ...props }: AvatarProps) => {
    const sizes = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    };

    return (
        <img
            className={cn(
                'rounded-full object-cover border border-gray-100 shadow-sm',
                sizes[size],
                className
            )}
            {...props}
        />
    );
};

export { Avatar };
