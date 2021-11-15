import { IconButton } from "@chakra-ui/button";
import { useRouter } from "next/router";
import { ChevronLeft } from "react-feather";
import { motion } from "framer-motion";

function BackButton() {
  const router = useRouter();

  function handleOnCLick() {
    router.back();
  }

  return (
    <IconButton
      as={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      cursor="pointer"
      size="lg"
      left="20px"
      bottom="20px"
      position="fixed"
      aria-label="back"
      onClick={handleOnCLick}
      icon={<ChevronLeft size={20} />}
    />
  );
}

export default BackButton;
