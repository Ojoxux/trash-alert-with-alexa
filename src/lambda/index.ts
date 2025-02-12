import { SkillBuilders } from 'ask-sdk-core';
import { LaunchRequestHandler } from './handlers/LaunchRequest';
import { TodayTrashIntentHandler } from './handlers/TodayTrashIntent';

export const handler = SkillBuilders.custom()
  .addRequestHandlers(LaunchRequestHandler, TodayTrashIntentHandler, {
    canHandle(handlerInput) {
      return (
        handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
        (handlerInput.requestEnvelope.request.intent.name ===
          'AMAZON.HelpIntent' ||
          handlerInput.requestEnvelope.request.intent.name ===
            'AMAZON.CancelIntent' ||
          handlerInput.requestEnvelope.request.intent.name ===
            'AMAZON.StopIntent')
      );
    },
    handle(handlerInput) {
      const speechText = 'ご利用ありがとうございました。';
      return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(true)
        .getResponse();
    },
  })
  .lambda();
