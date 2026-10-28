export const GALLERY_BUCKET_NAME = "UT-gallery";
const AUTHORIZED_GALLERY_USER_IDS = new Set([
  "866abca4-ee32-4f24-a719-025c97946e7b",
  "d8cedf00-da06-4221-b6be-16fbdc8789d8",
]);

export function isAuthorizedGalleryUser(userId: string | null | undefined): boolean {
  return userId != null && AUTHORIZED_GALLERY_USER_IDS.has(userId);
}
