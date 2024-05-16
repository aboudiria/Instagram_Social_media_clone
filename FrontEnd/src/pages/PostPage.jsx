import { Avatar, Flex, Box, Button, Divider, Text, Image } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";

import { useState } from "react"; 
import Comment from "../components/Comment";

export default function PostPage() {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex>
        <Flex w={"full"} gap={3} alignItems={'center'} >
          <Avatar src="/abed-avatar.jpg" size={'md'} name="abdel karim dawoud"/>
          <Flex>
            <Text fontSize={'sm'} fontWeight={'bold'}>Abdel karim dawoud</Text>
            <Image src='/verified.png' w='4' h={4} ml={4} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'}>
          <Text fontSize={'sm'} color={'gray.light'}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>
      <Text my={3}>Lets talk about threads</Text>

      <Box borderRadius={6} overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
        <Image src='/abed-avatar.jpg' w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={'center'} >
        <Text color={'gray.light'} fontSize={'sm'}> 238 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={'gray.light'} fontSize={'sm'} >
          {200 +(liked ? 1 : 0) } likes
        </Text>
      </Flex>
      <Divider my={4} />

      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'} >
          <Text fontSize={'2xl'} >✋</Text>
          <Text  color={"gray.light"} >Get the app to like, reply and post.</Text>
        </Flex>
        <Button>Get </Button>
      </Flex>
      <Divider my={4} />
      <Comment
        comment="lets go"
        createdAt='2d'
        likes={300}
        username="john"
        userAvatar='/abed-avatar.jpg'
      />
    </>
  )
}
