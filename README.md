# fixie-sidekick-template
Template project for building a Fixie Sidekick.

You need to create a .env file in the root folder and add two variables:

```
FIXIE_API_URL=https://beta.fixie.ai
FIXIE_API_KEY=<your API key for Fixie>
```

Note: the FIXIE_API_KEY value will be a 175 character string.

There are a number of places in the template marked "TODO". You should update the project in these places for your sidekick.

You also need to run ```yarn install``` prior to deploying. Then you can deploy with ```FIXIE_API_URL='https://beta.fixie.ai' npx @fixieai/fixie deploy```