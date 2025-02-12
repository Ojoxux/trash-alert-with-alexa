import { RequestHandler, HandlerInput } from 'ask-sdk-core';

export const LaunchRequestHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput: HandlerInput) {
    const speechText =
      'Trash Alertへようこそ。今日のゴミの日情報をお知らせします。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  },
};
