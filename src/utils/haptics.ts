export const triggerHaptic = (style: 'light' | 'medium' | 'heavy' | 'success' | 'warning' | 'error' = 'medium') => {
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
        switch (style) {
            case 'light':
                navigator.vibrate(10);
                break;
            case 'medium':
                navigator.vibrate(20);
                break;
            case 'heavy':
                navigator.vibrate(40);
                break;
            case 'success':
                navigator.vibrate([10, 30, 10]);
                break;
            case 'warning':
                navigator.vibrate([30, 50, 10]);
                break;
            case 'error':
                navigator.vibrate([50, 30, 50, 30]);
                break;
            default:
                navigator.vibrate(20);
        }
    }
};
