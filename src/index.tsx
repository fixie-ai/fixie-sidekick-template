import { Tool } from "ai-jsx/batteries/use-tools";
import { YourSidekickSystemMessage } from "./system-message.js";
import { FixieCorpus } from "ai-jsx/batteries/docs";
import { Sidekick, SidekickProps } from "ai-jsx/sidekick";
import { OpenAI } from "ai-jsx/lib/openai";

//TODO: Replace with your Fixie Corpus ID
// This Corpus contains information about foxes. Some suggested queries to try once
// you deploy this sidekick are:
//    tell me about foxes and what they eat
//    what is the fennec fox like? how big do they get?
//    who is foxie?
const FIXIE_CORPUS_ID: string = "44094d5a-f817-4c2e-a2a4-8f8a0c936d0f";

if (!FIXIE_CORPUS_ID) {
  throw new Error("Please set a FIXIE_CORPUS_ID in src/index.tsx");
}

const systemMessage = <YourSidekickSystemMessage />;

const tools: Record<string, Tool> = {
  // TODO: To help the model understand when to call this tool, name the function
  // something more descriptive like 'lookUpAcmeCompanyKnowledgeBase'.
  // For more tips on using Tools, see: https://docs.ai-jsx.com/tutorial/part7-tools
  lookUpKnowledgeBase: FixieCorpus.createTool(
    FIXIE_CORPUS_ID,
    "A tool for looking up additional information to help answer the user query."
  ),
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
    <OpenAI chatModel="gpt-4-32k">
      <Sidekick
        systemMessage={systemMessage}
        tools={tools}
        outputFormat="text/mdx"
        includeNextStepsRecommendations={true}
        useCitationCard={true}
      />
    </OpenAI>
    
  );
}
