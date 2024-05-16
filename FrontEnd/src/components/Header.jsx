import { Flex, Image, useColorMode } from '@chakra-ui/react';

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent={"center"} mt={6} mb='12'>
      <Image
        cursor="pointer"
        w={7}
        alt="logo"
        src={colorMode === 'dark' ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}
