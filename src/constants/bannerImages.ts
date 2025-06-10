import Img01 from '@/assets/images/img_banner_01.jpg';
import Img02 from '@/assets/images/img_banner_02.jpg';
import Img03 from '@/assets/images/img_banner_03.jpg';
import Img04 from '@/assets/images/img_banner_04.jpg';
import Img05 from '@/assets/images/img_banner_05.jpg';
import Img06 from '@/assets/images/img_banner_06.jpg';
import Img07 from '@/assets/images/img_banner_07.jpg';
import Img08 from '@/assets/images/img_banner_08.jpg';
import Img09 from '@/assets/images/img_banner_09.jpg';
import Img10 from '@/assets/images/img_banner_10.jpg';
import Img11 from '@/assets/images/img_banner_11.jpg';
import Img12 from '@/assets/images/img_banner_12.jpg';

interface BannerImage {
  src: string;
  fileName: string;
}

const bannerImages: BannerImage[] = [
  { src: Img01.src, fileName: 'img_banner_01.jpg' },
  { src: Img02.src, fileName: 'img_banner_02.jpg' },
  { src: Img03.src, fileName: 'img_banner_03.jpg' },
  { src: Img04.src, fileName: 'img_banner_04.jpg' },
  { src: Img05.src, fileName: 'img_banner_05.jpg' },
  { src: Img06.src, fileName: 'img_banner_06.jpg' },
  { src: Img07.src, fileName: 'img_banner_07.jpg' },
  { src: Img08.src, fileName: 'img_banner_08.jpg' },
  { src: Img09.src, fileName: 'img_banner_09.jpg' },
  { src: Img10.src, fileName: 'img_banner_10.jpg' },
  { src: Img11.src, fileName: 'img_banner_11.jpg' },
  { src: Img12.src, fileName: 'img_banner_12.jpg' },
];

export default bannerImages;
