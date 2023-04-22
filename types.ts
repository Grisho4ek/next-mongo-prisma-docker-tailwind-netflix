interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

interface User {
  id: string;
  name: string;
  image: string;
  email: string;
  emailVerified: string;
  hashedPassword: string;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
}
