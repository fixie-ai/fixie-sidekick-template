/// <reference lib="dom" />

import { Tool } from "ai-jsx/batteries/use-tools";
import {
  YourSidekickSystemMessage,
  finalSystemMessageBeforeResponse,
} from "./system-message.js";
import { FixieCorpus } from "ai-jsx/batteries/docs";
import { Sidekick } from "ai-jsx/sidekick";
import _ from "lodash";

//TODO: Replace with your Fixie Corpus ID
const FIXIE_CORPUS_ID = "";

if (!FIXIE_CORPUS_ID) {
  throw new Error("Please set a FIXIE_CORPUS_ID in src/index.tsx");
}

const fullCorpus = new FixieCorpus(FIXIE_CORPUS_ID);
const systemMessage = <YourSidekickSystemMessage />;

const tools: Record<string, Tool> = {
  // TIP: To help the model understand when to call this tool, name the function
  // something more descriptive like 'lookUpAcmeCompanyKnowledgeBase'.
  // For more tips on using Tools, see: https://docs.ai-jsx.com/tutorial/part7-tools
  lookUpKnowledgeBase: {
    // Name this function something like 'lookUpAcmeCompanyKnowledgeBase".
    description:
      "A tool for looking additional information to help answer the user query.",
    parameters: {
      query: {
        description:
          "The search query. It will be embedded and used in a vector search against the corpus.",
        type: "string",
        required: true,
      },
    },
    func: async ({ query }) => {
      const results = await fullCorpus.search(query);
      /**
       * Reverse the array so the closest chunk is listed last (closest to the user query).
       *
       * N.B.: The results will not be sorted by `score`, because the point of
       * the reranker is to reorder them.
       */
      results.reverse();

      /**
       * Ideally we'd pass a limit, but I don't know how high a limit we'll need to set to have enough results after
       * the dedupe.
       */
      return JSON.stringify({
        kind: "docs",
        results: _.uniqBy(results, (result) => result.chunk.content),
      });
    },
  },
  /*
  anotherPossibleTool: {
    description:
      "Another tool, possibly for calling out to an API",
    parameters: {
      query: {
        description:
          "A parameter for the tool",
        type: "string",
        required: true,
      },
    },
    func: async ({ query }) => {
      return "Hello, world! Your query was: {query}"
    },
  }
  */
};

export default function SidekickTemplate() {
  return (
    <Sidekick
      // TIP: Give the Sidekick a descriptive role like "A helpful assistant for Acme Company".
      role="A helpful assistant"
      systemMessage={systemMessage}
      tools={tools}
      finalSystemMessageBeforeResponse={finalSystemMessageBeforeResponse}
    />
  );
}
