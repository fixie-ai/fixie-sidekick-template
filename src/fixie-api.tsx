
// const FIXIE_API_KEY: string = process.env["FIXIE_API_KEY"];
// const FIXIE_BASE_URL: string = process.env["FIXIE_API"];




function assertEnvVar(name: string): string {
    if (process.env[name] === undefined) {
      throw new Error(`Missing environment variable: ${name}`)
    }
    return process.env[name]!
  }

export async function fetchFixieAPI(
    pathname: string,
    urlParams: Record<string, any> = {},
    method: string = 'GET',
    body?: string
  ) {
    const fixieAPIKey = assertEnvVar('FIXIE_API_KEY');
    // const helpScoutAPIKey = await getSidekickAPIKey()
  
    // const url = new URL({pathname}, fixieBaseURL);
    const url = new URL(`https://api.fixie.ai/api/v1/${pathname}`)
    // url.search = querystring.stringify(urlParams)
  
    const response = await fetch(url.toString(), {
      method,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${fixieAPIKey}`
      },
      body
    })
    if (response.status !== 200) {
      throw new Error(
        `Got error response from Fixie API: ${response.status} ${
          response.statusText
        } ${await response.text()}`
      )
    }
    return response.text()
  }

  /****************************************************************/
  // Corpus
  /****************************************************************/
  export async function listFixieCorpora(args: object) {
    const fixieAPIKey = assertEnvVar('FIXIE_API_KEY');
    const url = new URL("https://api.fixie.ai/api/v1/corpora");
    const params = url.searchParams;

    // If we have args, add them to the querystring
    if(args.hasOwnProperty("ownerType")) {
      // @ts-ignore
      params.append("owner_type", args["ownerType"].toString());
      url.search = params.toString();
    }

    // console.log("our url is...");
    // console.log(url.toString());
  
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        'Authorization': `Bearer ${fixieAPIKey}`
      },
    })
    if (response.status !== 200) {
      throw new Error(
        `Got error response from Fixie API: ${response.status} ${
          response.statusText
        } ${await response.text()}`
      )
    }
    return response.text()
  }

  export async function getFixieCorpus(corpusId: string) {
    const fixieAPIKey = assertEnvVar('FIXIE_API_KEY');
    const url = new URL(`https://api.fixie.ai/api/v1/corpora/${corpusId}`);

    console.log(`our URL is ${url.toString()}`);
  
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${fixieAPIKey}`
      },
    })
    if (response.status !== 200) {
      throw new Error(
        `Got error response from Fixie API: ${response.status} ${
          response.statusText
        } ${await response.text()}`
      )
    }
    return response.text()
  }

  export async function createFixieCorpus(args: object) {
    const fixieAPIKey = assertEnvVar('FIXIE_API_KEY');
    const url = new URL("https://api.fixie.ai/api/v1/corpora");

    const requestBody = {"corpus": args};
  
    console.log(`calling createFixieCorpus with args: ${JSON.stringify(requestBody)}`);
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${fixieAPIKey}`
      },
      body: JSON.stringify(requestBody)
    })
    if (response.status !== 200) {
      throw new Error(
        `Got error response from Fixie API: ${response.status} ${
          response.statusText
        } ${await response.text()}`
      )
    }
    return response.text()
  }

  export async function deleteFixieCorpus(corpusId: string) {
    const fixieAPIKey = assertEnvVar('FIXIE_API_KEY');
    const url = new URL(`https://api.fixie.ai/api/v1/corpora/${corpusId}`);
  
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${fixieAPIKey}`
      },

    })
    if (response.status !== 200) {
      throw new Error(
        `Got error response from Fixie API: ${response.status} ${
          response.statusText
        } ${await response.text()}`
      )
    }
    return response.text()
  }

  /****************************************************************/
  // Sources
  /****************************************************************/
  export async function listCorporaSources(corpusId: string) {
    const fixieAPIKey = assertEnvVar('FIXIE_API_KEY');
    const url = new URL(`https://api.fixie.ai/api/v1/corpora/${corpusId}/sources`);

    // TODO implement querystring params
    // const params = url.searchParams;

    // If we have args, add them to the querystring
    // if(args.hasOwnProperty("ownerType")) {
    //   // @ts-ignore
    //   params.append("owner_type", args["ownerType"].toString());
    //   url.search = params.toString();
    // }

    // console.log("our url is...");
    // console.log(url.toString());
  
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${fixieAPIKey}`
      },
    })
    if (response.status !== 200) {
      throw new Error(
        `Got error response from Fixie API: ${response.status} ${
          response.statusText
        } ${await response.text()}`
      )
    }
    return response.text()
  }

  export async function getSource({corpusId, sourceId}: {corpusId: string, sourceId: string}) {
    const fixieAPIKey = assertEnvVar('FIXIE_API_KEY');
    const url = new URL(`https://api.fixie.ai/api/v1/corpora/${corpusId}/sources/${sourceId}`);

    console.log(`our URL is ${url.toString()}`);
  
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${fixieAPIKey}`
      },
    })
    if (response.status !== 200) {
      throw new Error(
        `Got error response from Fixie API: ${response.status} ${
          response.statusText
        } ${await response.text()}`
      )
    }
    return response.text()
  }