import { FC } from 'react'

import { Text, VStack } from '@chakra-ui/react'

interface LabeledDataProps {
  title: string
  text: string
  w?: string | number
}

const LabeledData: FC<LabeledDataProps> = ({ title, text, w }) => (
  <VStack w={w} spacing={0} align="flex-start">
    <Text fontSize="xs" fontWeight="bold" color="brand.100">
      {title.toUpperCase()}
    </Text>
    <Text color="brand.50" textOverflow="clip">
      {text}
    </Text>
  </VStack>
)

export default LabeledData
