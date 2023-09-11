/// <reference lib="dom" />

import { Tool } from 'ai-jsx/batteries/use-tools';
import { YourSidekickSystemMessage, finalSystemMessageBeforeResponse } from './system-message.js';
import { FixieCorpus } from 'ai-jsx/batteries/docs'
import { Sidekick } from 'ai-jsx/sidekick';
import _ from 'lodash';

const FIXIE_CORPUS_ID = "< TODO your_Fixie_corpus_ID>";
const fullCorpus = new FixieCorpus(FIXIE_CORPUS_ID);
const systemMessage = <YourSidekickSystemMessage />

const tools: Record<string, Tool> = {
  lookUpTODOKnowledgeBase: {                      // Name this function something like 'lookUpAcmeCompanyKnowledgeBase".
    description:
      'TODO Your KB/corpus description...',
    parameters: {
      query: {
        description:
          'The search query. It will be embedded and used in a vector search against the corpus.',
        type: 'string',
        required: true
      }
    },
    func: async ({ query }) => {
      const results = await fullCorpus.search(query)
      /**
       * Ideally we'd pass a limit, but I don't know how high a limit we'll need to set to have enough results after
       * the dedupe.
       */
      const resultsWithoutDupes = _.uniqBy(
        results,
        result => result.chunk.content
      )
      /**
       * Reverse the array so the closest chunk is listed last (closest to the user query).
       *
       * N.B.: The results will not be sorted by `score`, because the point of
       * the reranker is to reorder them.
       */
      results.reverse()
      return resultsWithoutDupes
        .map(
          result => `
\`\`\`chunk
${result.chunk.content.replaceAll('```', '\\`\\`\\`')}
\`\`\`
`
        )
        .join('\n')
    }
  },
};

export default function SidekickTemplate() {
  return (
    <Sidekick
      role="TODO your sidekick role."
      systemMessage={systemMessage}
      tools={tools}
      finalSystemMessageBeforeResponse={finalSystemMessageBeforeResponse}
    />
  );
}
