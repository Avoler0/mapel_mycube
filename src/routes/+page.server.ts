import { localStorageStore } from '@skeletonlabs/skeleton';

export const load = () => {
  const price = {
    redCube: 12500000,
    blackCube: 22600000
  }
  const mapleCubeUrl = 'https://public.api.nexon.com/openapi/maplestory/v1/cube-use-results';
  

  let result;
  const unitWords = ['', '만', '억', '조', '경'];
  const numbers = []
  return {
    price,
    mapleCubeUrl,
    result
  }
}
