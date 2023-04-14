import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from '@chakra-ui/react'

import Evidencia from './evidencias'
import Session from './session'

const CompleteRegistration = () => {
  return (
    <Box w="100%">
      <Tabs isFitted color="white" colorScheme="brandSecondary">
        <TabList>
          <Tab>Sesión Registrada</Tab>
          {process.env.NEXT_PUBLIC_SHOW_DOC === 'true' && (
            <Tab>Apoyo Visual</Tab>
          )}
        </TabList>

        <TabPanels pt={7}>
          <TabPanel>
            <Session />
          </TabPanel>
          {process.env.NEXT_PUBLIC_SHOW_DOC === 'true' && (
            <TabPanel>
              <Evidencia />
            </TabPanel>
          )}
        </TabPanels>
      </Tabs>
    </Box>
  )
}

export default CompleteRegistration
