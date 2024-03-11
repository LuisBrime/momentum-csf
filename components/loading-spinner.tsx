import { FC } from 'react'

import { Center, CircularProgress } from '@chakra-ui/react'

const LoadingSpinner: FC<{}> = () => (
  <Center py={18} h="100%">
    <CircularProgress
      isIndeterminate
      size={10}
      color="brand.300"
      thickness="6px"
    />
  </Center>
)

export default LoadingSpinner
