import { VStack, Flex, Box, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { Avatar } from "@chakra-ui/avatar";
import { Link } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { Portal } from "@chakra-ui/portal";

export default function UserHeader() {
  const toast = useToast();
  const copyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast({ description: "link is copied", duration: 3000 });
    });
  };

  return (
    <VStack gap={4} alignItems="start">
      <Flex w="full" justifyContent="space-between">
        <Box>
          <Text fontSize="2xl" fontWeight="bold">
            Abdel Karim Dawoud
          </Text>
          <Flex gap={2} alignItems="center">
            <Text fontSize="sm">AbdelKarimDawoud</Text>
            <Text fontSize={'xs'} bg="gray.dark" color="gray.light" p={1} borderRadius="full">
              thread.net
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar name="AbdelKarimDawoud" src="/abed-avatar.jpg" size={
            {
              base:"md",
              md:"xl",
            }
          } />
        </Box>
      </Flex>
      <Text>Junior Full Stack Web Development</Text>
      <Flex w="full" justifyContent="space-between">
        <Flex gap={2} alignItems="center">
          <Text color="gray.light">3.2k Followers</Text>
          <Box w="1" h="1" bg="gray.light" borderRadius="full" />
          <Link color="gray.light">instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icons-container">
            <BsInstagram size={24} cursor="pointer" />
          </Box>
          <Box className="icons-container" marginLeft="13px">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor="pointer" />
              </MenuButton>
              <Portal>
                <MenuList bg="gray.dark">
                  <MenuItem bg="gray.dark" onClick={copyUrl}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w="full">
        <Flex flex={1} borderBottom="1px solid white" justifyContent="center" pb="3" cursor="pointer">
          <Text fontWeight="bold">Threads</Text>
        </Flex>
        <Flex flex={1} borderBottom="1px solid white" color="white" justifyContent="center" pb="3" cursor="pointer">
          <Text fontWeight="bold">Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
}
