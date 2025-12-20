import { responsiveSizes } from "@/constants/font-spacing";
import { fonts } from "@/constants/fonts";
import { Colors } from "@/constants/theme";
import { useResponsiveFontSize } from "@/hooks/use-responsive-sizing";
import React from "react";
import { Text as RNText, TextProps } from "react-native";

interface ResponsiveTextProps extends TextProps {
    size?:
    "xxs" |
    "xs" |
    "sm" |
    "md" |
    "lg" |
    "xl" |
    "xxl" |
    "input" |
    "label" |
    "title" |
    "subHeading" |
    "heading" |
    "logo" |
    "tagline" |
    "countryCode" |
    "footer",
    weight?: "lightFontPoppins" | "mediumFontPoppins" | "semiBoldFontPoppins" | "boldFontPoppins" |
    "extraBoldFontPoppins" | "lightFontKarla" | "regularFontKarla" | "mediumFontKarla" | "boldFontKarla" |
    "extraBoldFontKarla" | "regularFontRye" | "regularFontBungee",
    color?: string;
}

export const Text: React.FC<ResponsiveTextProps> = ({
    size = "sm",
    weight = size === "xs" || size === "xxs" || size === "footer" ? "lightFont"
        : size === "sm" ? "regularFont" : size === "md" || size === "lg" ? "mediumFont" : "boldFont",
    color,
    style,
    ...props
}) => {
    // Get base size from centralized responsive sizes
    const baseSize = responsiveSizes.fonts[size] || responsiveSizes.fonts.md;

    // Use the responsive sizing hook for calculation
    const responsiveSize = useResponsiveFontSize(baseSize);

    return (
        <RNText
            {...props}
            style={[
                {
                    fontSize: responsiveSize,
                    fontFamily: fonts[weight],
                    color: color || Colors.light.text,
                },
                style,
            ]}
        />
    );
};

export default Text;
