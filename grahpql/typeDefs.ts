import { gql } from "apollo-server-micro";

const typeDefs = gql`
  type Block {
    hash: String
    height: Float
    time: Float
    block_index: Float
  }
  type Transaction {
    hash: String
    ver: Float
    vin_sz: Float
    vout_sz: Float
    size: Float
    weight: Float
    fee: Float
    relayed_by: String
    lock_time: Float
    tx_index: Float
    double_spend: Boolean
    time: Float
    block_index: Float
    block_height: Float
  }
  type SingleBlock {
    hash: String
    ver: Float
    prev_block: String
    mrkl_root: String
    time: Float
    bits: Float
    nonce: Float
    n_tx: Float
    size: Float
    block_index: Float
    main_chain: Boolean
    height: Float
    received_time: Float
    relayed_by: String
    tx: [Transaction]
  }
  type Query {
    getBlocks: [Block]
    getBlock(hash: String): SingleBlock
    getTransaction(hash: String): Transaction
  }
`;

export default typeDefs;
