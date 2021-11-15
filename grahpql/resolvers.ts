import axios from "axios";

import constants from "../lib/constants";

const instance = axios.create({
  baseURL: constants.BLOCKCHAIN_ENDPOINT,
});
const resolvers = {
  Query: {
    async getBlocks() {
      try {
        const resp = await instance.get("/blocks/1573858800000?format=json");
        return resp.data;
      } catch (error) {
        throw error;
      }
    },
    async getBlock(_parent: undefined, args: { hash: string }) {
      try {
        const resp = await instance.get(`/rawblock/${args.hash}`);
        return resp.data;
      } catch (error) {
        throw error;
      }
    },
    async getTransaction(_parent: undefined, args: { hash: string }) {
      try {
        const resp = await instance.get(`/rawtx/${args.hash}`);
        return resp.data;
      } catch (error) {
        throw error;
      }
    },
  },
};

export default resolvers;
