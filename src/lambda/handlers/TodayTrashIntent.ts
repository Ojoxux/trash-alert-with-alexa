import { RequestHandler, HandlerInput } from 'ask-sdk-core';
import { getTodayTrashSchedule } from '../services/trashSchedule';

export const TodayTrashIntentHandler: RequestHandler = {
  canHandle(handlerInput: HandlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name ===
        'TodayTrashIntent' ||
        handlerInput.requestEnvelope.request.intent.name ===
          'AMAZON.FallbackIntent')
    );
  },
  async handle(handlerInput: HandlerInput) {
    try {
      const timestamp = handlerInput.requestEnvelope.request.timestamp;
      const todaySchedule = await getTodayTrashSchedule(timestamp);
      const today = new Date(timestamp);
      const dateStr = today.toLocaleDateString('ja-JP', {
        month: 'long',
        day: 'numeric',
        weekday: 'long',
      });

      let speechText;
      if (!todaySchedule || todaySchedule === '情報の取得に失敗しました') {
        speechText = `${dateStr}は収集予定がありません。`;
      } else {
        speechText = `${dateStr}の収集は${todaySchedule}です。午前8時までに出してください。`;
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .withShouldEndSession(true)
        .getResponse();
    } catch (error) {
      console.error('Error:', error);
      const errorText = 'すみません、ゴミ収集情報の取得に失敗しました。';

      return handlerInput.responseBuilder
        .speak(errorText)
        .withShouldEndSession(true)
        .getResponse();
    }
  },
};
