import { Tool } from "ai-jsx/batteries/use-tools";
import {
  YourSidekickSystemMessage,
  finalSystemMessageBeforeResponse,
} from "./system-message.js";
import { FixieCorpus } from "ai-jsx/batteries/docs";
import { Sidekick } from "ai-jsx/sidekick";
import { getFixieCorpus, createFixieCorpus, deleteFixieCorpus, listFixieCorpora} from "./fixie-api.js";
import { listCorporaSources, getSource } from "./fixie-api.js";
import { IsomorphicFixieClient } from "fixie";

const fixieClient = IsomorphicFixieClient.CreateWithoutApiKey();
const FIXIE_CORPUS_ID: string = "437594d6-ae69-4e54-abea-c58ab2be80ec";

if (!FIXIE_CORPUS_ID) {
  throw new Error("Please set a FIXIE_CORPUS_ID in src/index.tsx");
}

const systemMessage = <YourSidekickSystemMessage />;

const tools: Record<string, Tool> = {
  lookUpFixieKnowledgeBase: FixieCorpus.createTool(
    FIXIE_CORPUS_ID,
    "A tool for looking up additional information to help answer the user query."
  ),
  listCorpora: {
    description: 'List all available corpora. Always ask the user for the ownerType parameter.',
    parameters: {
      ownerType: {
        description:
          'The type of owner to filter by. If unspecified, all corpora are returned. Options are OWNER_ALL, OWNER_USER, OWNER_ORG, and OWNER_PUBLIC.',
        type: 'string',
        required: true
      }
    },
    func: async function (args) {
      return listFixieCorpora(args);
    }
  },
  getCorpus: {
    description: 'Get a single corpus.',
    parameters: {
      corpusId: {
        description: 'The ID of a corpus.',
        type: 'string',
        required: true
      },
    },
    func: async function (args) {
      return getFixieCorpus(args.corpusId);
    }
  },
  deleteCorpus: {
    description: 'Delete a corpus. Ask the user for any required parameters. Ask the user to verify the deletion before proceeding.',
    parameters: {
      corpusId: {
        description:
          'The ID of the corpus to delete.',
        type: 'string',
        required: true
      },
    },
    func: async function (args) {
      return deleteFixieCorpus(args.corpusId);
    }
  },
  createCorpus: {
    description: 'Create a new corpus. Ask the user for any required parameters.',
    parameters: {
      displayName: {
        description:
          'The human-readable name of the corpus.',
        type: 'string',
        required: true
      },
      description: {
        description:
          'The human-readable description of the corpus.',
        type: 'string',
        required: false
      },
      public: {
        description:
          'Whether this corpus is public. A public corpus is visible to other users of the Fixie platform, and can be queried by any agent. Only the corpus owner may modify its settings, however.',
        type: 'boolean',
        required: false
      },
    },
    func: async function (args) {
      return createFixieCorpus(args);
    }

    // {
    //   "corpusId": "string",
    //   "displayName": "string",
    //   "created": "2023-09-30T21:48:57.845Z",
    //   "modified": "2023-09-30T21:48:57.847Z",
    //   "stats": {
    //     "status": "CORPUS_STATUS_UNSPECIFIED"
    //   },
    //   "description": "string",
    //   "public": true,
    //   "jobCallbacks": [
    //     {
    //       "stateFilter": [
    //         "JOB_STATE_UNSPECIFIED"
    //       ],
    //       "webhook": {
    //         "url": "string",
    //         "headers": {},
    //         "bodyFieldMask": "string",
    //         "doNotRetry": true
    //       }
    //     }
    //   ]
    // }

  },
  listCorpusSources: {
    description: 'List all sources for a corpus. Ask the user for any required parameters.',
    parameters: {
      corpusId: {
        description: 'The ID of a corpus.',
        type: 'string',
        required: true
      },
    },
    func: async function (args) {
      return listCorporaSources(args.corpusId);
    }
  },
  getCorpusSource: {
    description: 'Get a single source for a corpus. Ask the user for any required parameters.',
    parameters: {
      corpusId: {
        description: 'The ID of a corpus.',
        type: 'string',
        required: true
      },
      sourceId: {
        description: 'The ID of a source.',
        type: 'string',
        required: true
      },
    },
    // @ts-ignore
    func: async function (args) {
      console.log(`getCorpusSource args: ${JSON.stringify(args)}`);
      return fixieClient.getCorpusSource(args.corpusId, args.sourceId);
      // return getSource(args);
    }
  },
};

export default function SidekickTemplate() {
  return (
    <Sidekick
      role="A helpful assistant for the Fixie Corpus API."
      systemMessage={systemMessage}
      tools={tools}
      finalSystemMessageBeforeResponse={finalSystemMessageBeforeResponse}
    />
  );
}
