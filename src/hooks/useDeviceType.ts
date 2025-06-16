import { useEffect, useState } from 'react';

export type DeviceType = 'pc' | 'tab' | 'mob';

export const useDeviceType = (): DeviceType => {
  const [device, setDevice] = useState<DeviceType>('pc');
  useEffect(() => {
    const getType = () => {
      const width = window.innerWidth;
      if (width >= 1344) return 'pc';
      if (width >= 744) return 'tab';
      return 'mob';
    };
    const handleResize = () => {
      setDevice(getType());
    };
    handleResize(); // 초기값 설정
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return device;
};
