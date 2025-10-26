import { MetadataRoute } from 'next';
import { CONST } from './constants';

// PWA用のマニフェスト設定
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: CONST.APP_NAME,
    short_name: CONST.APP_SHORT_NAME,
    description: CONST.APP_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/images/icon.png',
        sizes: '512x512',
        type: 'image/png',
      }
    ]
  };
}