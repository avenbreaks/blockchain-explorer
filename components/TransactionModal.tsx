import { Button } from "@chakra-ui/button";
import { Text } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";

import utils from "../utils";

type props = {
  isOpen: boolean;
  onClose: () => void;
  transaction: {
    hash: String;
    tx_index: number;
    relayed_by: String;
  };
};

function TransactionModal(props: props) {
  const { isOpen, transaction, onClose } = props;
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb="2">Hash: {transaction.hash}</Text>
            <Text>
              Transaction Index: {utils.formatNumber(transaction.tx_index)}
            </Text>
            <Text mb="2">Relayed by: {transaction.relayed_by}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TransactionModal;
