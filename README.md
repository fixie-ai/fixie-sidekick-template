# fixie-sidekick-template
Template project for building a Fixie Sidekick.

You need to create a .env file in the root folder and add two variables:

```
FIXIE_API_URL=https://beta.fixie.ai
FIXIE_API_KEY=<your API key for Fixie>
```

You also need to run ```yarn install``` prior to deploying. Then you can deploy with ```FIXIE_API_URL='https://beta.fixie.ai' npx @fixieai/fixie deploy```