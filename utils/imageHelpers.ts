
/**
 * Safe Image Helper
 * 
 * Ensures that Image sources are valid to prevent Android crashes.
 * React Native on Android crashes if specific invalid props (like null uri) are passed to Image.
 * 
 * Usage:
 * <Image source={getSafeImageUri(user.photo)} />
 */

export const getSafeImageUri = (source: string | number | null | undefined, fallback?: any) => {
    // 1. If source is a number, it's a static require('...'). Safe to use.
    if (typeof source === 'number') {
        return source;
    }

    // 2. If source is a string and has length, it's likely a URI.
    if (typeof source === 'string' && source.length > 0) {
        return { uri: source };
    }

    // 3. Fallback
    // If a fallback is provided, use it (checking if it's safe recursively if needed, but usually it's a require)
    if (fallback) {
        return fallback;
    }

    // Default fallback if nothing else matches
    // Note: Adjust the path to your actual placeholder or default avatar
    // Since we know we have avatar.jpg in assets, we could use that as a generic backup
    // OR return a dedicated placeholder.
    // For now, let's assume we want to avoid crashing, so we return a valid object that might result in empty image but no crash,
    // or better, a placeholder.
    // However, if we don't have a placeholder.png, let's use the guest_avatar.jpg or avatar.jpg as safety

    // Returning a transparent pixel or similar would be safest if no placeholder exists, 
    // but the prompt suggested require('../../assets/images/placeholder.png').
    // Since we don't have that file confirmed, let's use a known existing file to be 100% crash proof.
    return require('../assets/guest_avatar.jpg');
};
