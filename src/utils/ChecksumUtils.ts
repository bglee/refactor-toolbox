/**
 * Generates a simple checksum for a string
 * This is a fast hash function suitable for detecting changes in code content
 * @param content The string content to hash
 * @returns A checksum string
 */
export function generateChecksum(...content: string[]): string {
  let hash = 0;
  if (content.length === 0) return hash.toString();
  const combinedContent = content.join("|");

  for (let i = 0; i < combinedContent.length; i++) {
    const char = combinedContent.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return hash.toString();
}

/**
 * Checks if the content has changed by comparing checksums
 * @param content The current content
 * @param existingChecksum The existing checksum to compare against
 * @returns true if content has changed, false otherwise
 */
export function hasContentChanged(content: string, existingChecksum?: string): boolean {
  if (!existingChecksum) return true; // No previous checksum, consider it changed
  const currentChecksum = generateChecksum(content);
  const changed = currentChecksum !== existingChecksum;

  return changed;
}
