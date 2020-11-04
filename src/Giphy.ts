export const giphy_api_key = "QkvyK4ZLwOJBNmwV93GZxDnitcbh7LEm";

interface giphy_fixed {
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };
  
  interface giphy_original {
    frames: string;
    hash: string;
    url: string;
    width: string;
    height: string;
    size: string;
    mp4: string;
    mp4_size: string;
    webp: string;
    webp_size: string;
  };

  interface giphy_images {
    fixed_height: giphy_fixed
    original: giphy_original;
  }
  
  interface giphy_trending {
    id: string;
    type: string;
    url: string;
    embed_url: string;
    title: string;
    images: giphy_images;
  };

  export default giphy_trending