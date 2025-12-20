import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

export type DeviceType = 'phone' | 'tablet' | 'desktop';

export const breakpoints = {
    phone: 375,
    smallTablet: 600,
    tablet: 768,
    largeTablet: 1024,
    desktop: 1280,
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const useResponsiveFontSize = (baseSize: number): number => {
    const { width } = useWindowDimensions();

    return useMemo(() => {
        const scaleFactor = width / 375;
        const clamped = clamp(scaleFactor, 0.6, 2.0);
        return Math.round(baseSize * Math.sqrt(clamped));
    }, [baseSize, width]);
};

export const responsiveFontSizes = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 28,
    logo: 36,
    heading: 26,
    subHeading: 22,
    tagline: 20,
};

export const useResponsiveSpacing = (baseSpacing: number): number => {
    const { width } = useWindowDimensions();

    return useMemo(() => {
        const scaleFactor = width / 375;
        const clamped = clamp(scaleFactor, 0.6, 2.0);
        return Math.round(baseSpacing * Math.sqrt(clamped));
    }, [baseSpacing, width]);
};

export const useDeviceType = (): DeviceType => {
    const { width } = useWindowDimensions();

    return useMemo(() => {
        if (width < breakpoints.tablet) return 'phone';
        if (width < breakpoints.desktop) return 'tablet';
        return 'desktop';
    }, [width]);
};
