const fallbackImages = [
  "/images/default_images/default1.jpeg",
  "/images/default_images/default2.jpg",
  "/images/default_images/default3.jpeg",
  "/images/default_images/default4.jpeg",
  "/images/default_images/default5.jpg",
];

export function getRandomFallbackImage(id) {
  if (!id) return fallbackImages[0];
  const hash = Array.from(String(id)).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return fallbackImages[hash % fallbackImages.length];
}

