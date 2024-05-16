import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

export default function Comment({ userAvatar, comment, username, createdAt, likes }) {
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar src={userAvatar} size={'sm'} />
        <Flex gap={1} flexDirection={'column'} w={'full'}>
          <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
            <Text fontSize={'sm'} fontWeight={'bold'}> {username}</Text>
            <Flex gap={2} alignItems={'center'}>
              <Text fontSize={'sm'} color={'gray.light'}>{createdAt}</Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text> {comment}</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text fontSize={'sm'} color={'gray.light'}>
            {{likes}+ (liked ? 1 : 0)}
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
    </>
  );
}
