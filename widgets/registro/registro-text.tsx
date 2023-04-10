import { ListItem, Text, UnorderedList } from '@chakra-ui/react'

const RegistroText = () => (
  <>
    <Text mb={2.5} color="white" size="md">
      Inicia tu registro para tu sesión de Momentum, una vez que comiences el
      proceso:
    </Text>

    <UnorderedList color="white">
      <ListItem>
        <Text color="white" size="md">
          La lista de sesiones se actualizará cada 10 segundos para mostrar las
          sesiones disponibles.
        </Text>
      </ListItem>
    </UnorderedList>
  </>
)

export default RegistroText
